import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

interface JobDetailSectionProps {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

export function JobDetailSection({
  icon: Icon,
  label,
  children,
  onEdit,
}: JobDetailSectionProps) {
  return (
    <div className="rounded-lg border border-border/60 bg-card shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </div>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={onEdit}
          >
            <PencilIcon className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        )}
      </div>
      <Separator />
      {children}
    </div>
  );
}
