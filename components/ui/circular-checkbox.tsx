"use client";

import { Circle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as React from "react";
import { useRef, useEffect, useCallback } from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { CircleCheckIcon } from "@icons/circle-check-animated-icon";
import { cn } from "@/lib/utils";

const SPARKLE_COUNT = 8;
// Increase SPARKLE_DISTANCE to spread the sparkles more widely
const SPARKLE_DISTANCE = 32;

function createSparkles() {
  return Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
    id: i,
    angle: (i / SPARKLE_COUNT) * 360,
  }));
}

const sparkles = createSparkles();

function CircularCheckbox({
  className,
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  ...rootProps
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
    defaultChecked === true
  );
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked === true : uncontrolledChecked;

  const prevCheckedRef = useRef(checked);
  const [showSparkles, setShowSparkles] = React.useState(false);

  const handleCheckedChange = useCallback(
    (value: boolean | "indeterminate") => {
      const nextChecked = value === true;
      if (!isControlled) setUncontrolledChecked(nextChecked);
      if (nextChecked && !prevCheckedRef.current) setShowSparkles(true);
      prevCheckedRef.current = nextChecked;
      onCheckedChange?.(value);
    },
    [isControlled, onCheckedChange]
  );

  useEffect(() => {
    const c = isControlled ? controlledChecked === true : uncontrolledChecked;
    prevCheckedRef.current = c;
  }, [isControlled, controlledChecked, uncontrolledChecked]);

  useEffect(() => {
    if (!showSparkles) return;
    const t = setTimeout(() => setShowSparkles(false), 500);
    return () => clearTimeout(t);
  }, [showSparkles]);

  return (
    <CheckboxPrimitive.Root
      data-slot="circular-checkbox"
      checked={isControlled ? controlledChecked : undefined}
      defaultChecked={!isControlled ? defaultChecked : undefined}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "group peer relative flex size-8 shrink-0 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer",
        className
      )}
      {...rootProps}
    >
      {/* Sparkle particles - burst when checked */}
      <AnimatePresence>
        {showSparkles && (
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            {sparkles.map(({ id, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * SPARKLE_DISTANCE;
              const y = Math.sin(rad) * SPARKLE_DISTANCE;
              return (
                <motion.span
                  key={id}
                  className="absolute size-1.5 rounded-full bg-primary"
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 0.2,
                    x,
                    y,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              );
            })}
          </span>
        )}
      </AnimatePresence>

      {/* Unchecked: circle outline (hidden when checked via Indicator presence) */}
      <span
        className={cn(
          "absolute flex items-center justify-center transition-opacity",
          checked && "pointer-events-none opacity-0"
        )}
        aria-hidden
      >
        <Circle
          className="size-6 text-muted-foreground transition-colors group-hover:text-primary"
          strokeWidth={2}
        />
      </span>

      {/* Checked: animated circle check icon */}
      <CheckboxPrimitive.Indicator
        data-slot="circular-checkbox-indicator"
        className="absolute flex items-center justify-center"
      >
        <CircleCheckIcon className="size-6 text-primary" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { CircularCheckbox };
