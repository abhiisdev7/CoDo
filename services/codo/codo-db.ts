import { Dexie, type EntityTable } from "dexie"

interface Tag {
  id?: number
  label: string
  color: string
  deleted?: 1 /* deleted */ | 0 /* not deleted */
}

interface MetaRow {
  key: string
  value: string
}

const codoDB = new Dexie("codo") as Dexie & {
  tags: EntityTable<Tag, "id">
  meta: EntityTable<MetaRow, "key">
}

codoDB.version(1).stores({
  tags: "++id, label, deleted",
  meta: "key",
})

export type CodoDb = typeof codoDB
export type { MetaRow, Tag }
export { codoDB }
