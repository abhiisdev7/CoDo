import { HeartHandshake } from "lucide-react"

const year = new Date().getFullYear()

export function ToolkitHomeFooter() {
  return (
    <footer className="p-4 border-t flex justify-between mt-auto text-muted-foreground">
      <p>
        Made With Efforts &{" "}
        <HeartHandshake size={20} className="inline text-primary fill-primary/20" />
      </p>
      <p>© {year} CoDo Labs</p>
    </footer>
  )
}
