"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@ui/field"
import { Input } from "@ui/input"
import { PaintBucket } from "lucide-react"
import { ReactNode, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { tagsService } from "@/services/codo/codo-tags-service"

const COLOR_PRESETS: readonly `#${string}`[] = [
  "#8b5cf6",
  "#22c55e",
  "#eab308",
  "#ec4899",
  "#0ea5e9",
  "#3b82f6",
  "#ef4444",
]

const addTagSchema = z.object({
  label: z.string().min(1, "Name is required").max(32, "Max 32 characters"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Pick a color"),
})

type AddTagFormValues = z.infer<typeof addTagSchema>
const DEFAULT_COLOR = COLOR_PRESETS[COLOR_PRESETS.length - 1]

export function AddNewTag({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const form = useForm<AddTagFormValues>({
    resolver: zodResolver(addTagSchema),
    defaultValues: {
      label: "",
      color: DEFAULT_COLOR,
    },
  })

  const selectedColor = useWatch({
    control: form.control,
    name: "color",
    defaultValue: DEFAULT_COLOR,
  })

  const onSubmit = async (data: AddTagFormValues) => {
    await tagsService.addTag({ ...data, label: data.label.toLowerCase() })

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Tag</DialogTitle>
          <DialogDescription>
            Add a new tag to organize your tasks. Pick a name and color.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.label}>
              <FieldLabel htmlFor="tag-name">Name</FieldLabel>
              <Input
                id="tag-name"
                placeholder="e.g. Work, Personal"
                autoFocus
                aria-invalid={!!form.formState.errors.label}
                {...form.register("label")}
              />
              <FieldError
                errors={form.formState.errors.label ? [form.formState.errors.label] : undefined}
              />
            </Field>

            <Field data-invalid={!!form.formState.errors.color}>
              <FieldLabel>Color</FieldLabel>
              <div className="mt-3 flex flex-wrap gap-3">
                {COLOR_PRESETS.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    data-selected={selectedColor === hex}
                    onClick={() => form.setValue("color", hex, { shouldValidate: false })}
                    className="group inline-flex items-center justify-center rounded-full border border-transparent p-1 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[selected=true]:border-primary data-[selected=true]:ring-2 data-[selected=true]:ring-primary/40"
                    aria-label={`Set accent color to ${hex}`}
                  >
                    <span className="size-7 rounded-full" style={{ backgroundColor: hex }} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <PaintBucket />
                <input
                  type="color"
                  className="size-10 cursor-pointer rounded-md border border-input bg-transparent p-0 shadow-xs [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0"
                  aria-label="Pick custom color"
                  {...form.register("color")}
                />
                <span className="text-sm text-muted-foreground">{selectedColor}</span>
              </div>
              <FieldError
                errors={form.formState.errors.color ? [form.formState.errors.color] : undefined}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Tag</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
