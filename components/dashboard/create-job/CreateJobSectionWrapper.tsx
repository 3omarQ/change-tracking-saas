import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CreateJobSectionWrapperProps {
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function CreateJobSectionWrapper({
  step,
  title,
  description,
  children,
  className,
}: CreateJobSectionWrapperProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-start gap-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold mt-0.5">
          {step}
        </div>
        <div>
          <h2 className="text-base font-semibold leading-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="ml-11">{children}</div>
    </div>
  );
}
