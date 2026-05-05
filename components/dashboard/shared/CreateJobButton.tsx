import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CreateJobButtonProps {
  size?: ButtonProps["size"];
  className?: string;
  label?: string;
}

export function CreateJobButton({
  size = "default",
  className,
  label = "Build new job",
}: CreateJobButtonProps) {
  return (
    <Button
      asChild
      size={size}
      className={cn(
        "group gap-2 whitespace-nowrap shadow-sm transition-shadow hover:shadow",
        className
      )}
    >
      <Link href="/dashboard/jobs/create-job">
        <PlusIcon className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
