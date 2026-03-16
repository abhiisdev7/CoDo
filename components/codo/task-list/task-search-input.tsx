import { Search } from "lucide-react"
import { InputGroup, InputGroupInput, InputGroupText } from "@ui/input-group"
import { Badge } from "@ui/badge"

export function TaskSearchInput() {
  return (
    <InputGroup className="px-6 py-8 bg-background dark:bg-background shadow-sm border-0 rounded-xl">
      <InputGroupText>
        <Search className="size-5" />
      </InputGroupText>
      <InputGroupInput placeholder="Search tasks, tags, or focus areas... (Press / to focus)" />
      <InputGroupText>
        <Badge variant="secondary" className="rounded-sm">/</Badge>
      </InputGroupText>
    </InputGroup>
  )
}
