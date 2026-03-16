"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Button } from "@ui/button"
import { Download, Upload } from "lucide-react"

export function SettingsDataControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Controls</CardTitle>
        <CardDescription>Export, import, or reset your local productivity data.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 @md:flex-row @md:items-center @md:justify-between">
          <div className="flex flex-1 flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => console.log("export-data")}>
              <Download className="mr-2 size-4" />
              Export data
            </Button>
            <Button type="button" variant="outline" onClick={() => console.log("import-data")}>
              <Upload className="mr-2 size-4" />
              Import data
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            className="@md:w-auto w-full"
            onClick={() => {
              const confirmed = window.confirm(
                "This will permanently clear all local CoDo data on this device. Continue?",
              )

              if (confirmed) {
                console.log("destroy-all-data")
              } else {
                console.log("cancel-destroy-all-data")
              }
            }}
          >
            Destroy all data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
