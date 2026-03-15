
export function HeaderTitle({ title, description = "" }: { title: string, description?: string }) {
  return (<header>
    <h1 className="scroll-m-20 pb-2 text-3xl tracking-tight font-semibold first:mt-0">{title}</h1>
    <p className="text-xl text-muted-foreground">{description}</p>
  </header>)
}
