import { PageHeaderTitle } from "@/components/codo/shared/page-header-title"
import { TabsList, TabsTrigger } from "@ui/tabs"
import { Calendar, CalendarFold, ListTodo } from "lucide-react"

export function TaskViewHeader() {
  return (
    <div className="flex justify-between">
      <PageHeaderTitle title="My Tasks" description="2 Tasks active." />
      <div className="flex gap-2">
        <TabsList>
          <TabsTrigger value="rearrange">
            <Calendar />
          </TabsTrigger>
          <TabsTrigger value="">
            <ListTodo />
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarFold />
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  )
}
