import { codoDB } from "./codo-db"
import { tagsService, SEED_TAGS_META_KEY, SEED_TAGS_VERSION } from "./codo-tags-service"

/**
 * Opens the DB and applies any seed migrations with version (applied, CURRENT_SEED_VERSION].
 * Safe to call on every app load; downgrades leave meta unchanged and skip unknown steps.
 */
export async function setupCodo(): Promise<void> {
  await codoDB.open()

  // setup tags
  const tagsVersionRaw = await codoDB.meta.get(SEED_TAGS_META_KEY)
  const tagsVersion = tagsVersionRaw ? Number(tagsVersionRaw.value) : undefined
  if (!tagsVersion || tagsVersion < SEED_TAGS_VERSION) {
    await tagsService.setupSeed()
  }
}
