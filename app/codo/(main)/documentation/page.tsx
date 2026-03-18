import { PageHeaderTitle } from "@/components/codo/shared/page-header-title"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Blockquote } from "@ui/blackquote"
import { Button } from "@ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card"
import { Code } from "@ui/code"
import { Kbd, KbdGroup } from "@ui/kbd"
import { ArrowUpRight } from "lucide-react"

export default function Documentation() {
  return (
    <main className="p-8 w-3xl mx-auto justify-between space-y-8 min-h-full">
      <PageHeaderTitle
        title="How to use ToDoS"
        description="Master your workflow with our step-by-step guide."
      />
      <div className="space-y-4 pb-8  ">
        <SmartTaskCreationGuide />
        <FocusModeGuide />
        <KeyShortcutsGuide />
        <FAQSection />
      </div>
    </main>
  )
}

function SmartTaskCreationGuide() {
  const keywords = {
    "Dates (@)": [
      "@today",
      "@tomorrow",
      "@next_week",
      "@next_month",
      "@next_year",
      "@on_19-03-2026",
    ],
    "Priority (!)": ["!high", "!medium", "!low"],
    "Tags (#)": ["#personal", "#work", "#fitness"],
    "Recurring (*)": ["*daily", "*weekly", "*monthly"],
  } as const

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Task Creation</CardTitle>
        <CardDescription>
          Accelerate your workflow using our intelligent input bar. Instantly set task details with
          easily remembered symbols.
        </CardDescription>
        <CardAction>
          <Button size="sm">
            Create a Task <ArrowUpRight />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Blockquote>
          &quot;Prepare annual marketing strategy presentation for board review{" "}
          <Code className="text-sky-500">@next_week</Code>{" "}
          <Code className="text-pink-500">!high</Code>{" "}
          <Code className="text-emerald-500">#work</Code>{" "}
          <Code className="text-yellow-500">*monthly</Code>
          &quot;
        </Blockquote>

        <ul className="grid grid-cols-2 gap-3 mt-6">
          {Object.entries(keywords).map(([label, words]) => (
            <li key={label} className="p-4 bg-muted rounded-xl">
              <h5>{label}</h5>
              <p className="break-after-all text-muted-foreground text-sm">{words.join(", ")}</p>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <span className="text-xs text-muted-foreground">
          Note: if you entered multiple keywords of the same category then the last one will be
          considered
        </span>
      </CardFooter>
    </Card>
  )
}

function FocusModeGuide() {
  const guide = [
    {
      step: 1,
      action: "Enter Focus",
      description: "Click the target icon in the sidebar or press `f`.",
    },
    {
      step: 2,
      action: "Start Timer",
      description: "25-minute sessions by default. Click the timer text to edit the duration.",
    },
    {
      step: 3,
      action: "Work",
      description:
        "Your top active task is pinned automatically (You can change it through bottom navigation). Lock the task",
    },
    {
      step: 4,
      action: "Start the timer",
      description: "Focus on one thing. Complete the tasks ✌🏻",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus Mode</CardTitle>
        <CardAction>
          <Button size="sm">
            Try Focus Mode
            <ArrowUpRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3">
        {guide.map((o) => (
          <div key={o.step} className="bg-muted p-4 rounded-xl space-y-2">
            <div className="bg-primary/20 size-8 flex-center rounded-full">{o.step}</div>
            <div className="space-y-2">
              <h3>{o.action}</h3>
              <p className="text-xs font-light text-muted-foreground">{o.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function KeyShortcutsGuide() {
  const shortcuts = [
    { keys: ["/"], action: "Focus Search" },
    { keys: ["i"], action: "Go to Inbox" },
    { keys: ["t"], action: "Go to Today" },
    { keys: ["f"], action: "Open Focus Mode" },
    { keys: ["s"], action: "Open Settings" },
    { keys: ["b"], action: "Toggle Sidebar" },
    { keys: ["Ctrl", "p"], action: "Command Palette" }, // Common extra shortcut for completeness
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shortcuts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>KEY</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shortcuts.map((shortcut, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <KbdGroup>
                    {shortcut.keys.map((key, i) => (
                      <Kbd key={i}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </TableCell>
                <TableCell>{shortcut.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function FAQSection() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>How do I delete a tag?</CardTitle>
          <CardDescription>
            Go to Settings &gt; Tag Management. Hover over a tag and click the <b>X</b> icon. This
            removes the tag from all tasks.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Where is my data stored?</CardTitle>
          <CardDescription>
            Your data is protected with <b>end-to-end encryption</b> only you can view or decrypt
            your tasks and notes. <b>Codo is fully open source</b>, and{" "}
            <b>your data is never used for AI training, or third party sharing</b>. You can export
            your data for backup at any time, and if you choose to delete your account, we will
            permanently remove all your information. If you return later, you can pick up right
            where you left off. 🤟🏻
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}
