"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { PlusIcon, PlusIconHandle } from "@icons/plus-animated-icon";
import { Input } from "@ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@ui/field";
import { cn } from "@/lib/utils";

const COLOR_PRESETS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#94a3b8",
  "#f43f5e",
  "#f59e42",
  "#10b981",
  "#0ea5e9",
] as const;

const addTagSchema = z.object({
  name: z.string().min(1, "Name is required").max(32, "Max 32 characters"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Pick a color"),
});

type AddTagFormValues = z.infer<typeof addTagSchema>;
const DEFAULT_COLOR = "#3b82f6";

export function AddNewTag() {
  const iconRef = useRef<PlusIconHandle>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<AddTagFormValues>({
    resolver: zodResolver(addTagSchema),
    defaultValues: {
      name: "",
      color: DEFAULT_COLOR,
    },
  });

  const selectedColor = form.watch("color");

  const onSubmit = (data: AddTagFormValues) => {
    // TODO: persist tag (e.g. API or local state)
    console.log("Add tag", data);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onMouseEnter={() => iconRef.current?.startAnimation?.()}
        onMouseLeave={() => iconRef.current?.stopAnimation?.()}>
        <Button className="mt-2 border-dashed" variant="outline">
          <PlusIcon ref={iconRef} /> Add New Tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Tag</DialogTitle>
          <DialogDescription>
            Add a new tag to organize your tasks. Pick a name and color.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="tag-name">Name</FieldLabel>
              <Input
                id="tag-name"
                placeholder="e.g. Work, Personal"
                autoFocus
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError errors={form.formState.errors.name ? [form.formState.errors.name] : undefined} />
            </Field>

            <Field data-invalid={!!form.formState.errors.color}>
              <FieldLabel>Color</FieldLabel>
              <div className="flex flex-wrap items-center gap-2">
                {COLOR_PRESETS.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    aria-label={`Use color ${hex}`}
                    className={cn(
                      "size-8 rounded-md border-2 border-transparent transition-[border-color,transform] hover:scale-110 cursor-pointer",
                      selectedColor === hex && "border-2 border-foreground shadow-sm"
                    )}
                    style={{ backgroundColor: hex }}
                    onClick={() => form.setValue("color", hex, { shouldValidate: false })}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  className="size-10 cursor-pointer rounded-md border border-input bg-transparent p-0 shadow-xs [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0"
                  aria-label="Pick custom color"
                  {...form.register("color")}
                />
                <span className="text-sm text-muted-foreground">{selectedColor}</span>
              </div>
              <FieldError errors={form.formState.errors.color ? [form.formState.errors.color] : undefined} />
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
  );
}
