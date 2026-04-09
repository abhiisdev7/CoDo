import { codoDB, type CodoDb, type Tag } from "./codo-db"

/** Default tags for new databases; each migration should stay idempotent where possible. */
export const SEED_TAGS_META_KEY = "seed_tags"
export const SEED_TAGS_VERSION = 1
export const SEED_TAGS: readonly Omit<Tag, "id">[] = [
  { label: "work", color: "#3498db", deleted: 0 },
  { label: "personal", color: "#e67e22", deleted: 0 },
  { label: "urgent", color: "#e74c3c", deleted: 0 },
] as const

class TagsService {
  private readonly db: CodoDb
  private readonly tags: CodoDb["tags"]

  constructor(db: CodoDb) {
    this.db = db
    this.tags = db.tags
  }

  async addTag({ label, color, deleted = 0 }: Omit<Tag, "id">) {
    const existing = await this.tags.where({ label }).first()

    if (existing) {
      if (existing.deleted) await this.tags.update(existing.id, { deleted: 0, color })
      return existing.id
    }

    return await this.tags.add({ label, color, deleted })
  }

  async getTags({ includeDeleted = false }: { includeDeleted?: boolean } = {}): Promise<Tag[]> {
    if (includeDeleted) return await this.tags.toArray()
    return await this.tags.where({ deleted: 0 }).toArray()
  }

  async getTagById(id: number, { includeDeleted = false } = {}): Promise<Tag | null> {
    const tag = await this.tags.get(id)

    if (!tag) return null
    if (!includeDeleted && tag.deleted) return null

    return tag
  }

  async updateTag(id: number, updates: Partial<Omit<Tag, "id">>) {
    return await this.tags.update(id, updates)
  }

  async deleteTag(id: number) {
    return await this.tags.update(id, { deleted: 1 })
  }

  /**
   * Ensures all seed tags exist in the database (idempotent).
   * Reactivates deleted tags if their label matches a seed.
   * Does not delete extra tags.
   */
  async setupSeed() {
    for (const seedTag of SEED_TAGS) {
      await this.addTag(seedTag)
    }

    await this.db.meta.put({
      key: SEED_TAGS_META_KEY,
      value: String(SEED_TAGS_VERSION),
    })
  }
}

export const tagsService = new TagsService(codoDB)
