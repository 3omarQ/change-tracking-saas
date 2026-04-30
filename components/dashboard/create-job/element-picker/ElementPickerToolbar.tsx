import { MousePointerClickIcon } from 'lucide-react';
import { HoverInfo } from '@/hooks/useElementPicker';

interface Props { hoverInfo: HoverInfo | null; }

export function ElementPickerToolbar({ hoverInfo }: Props) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border min-h-[36px] text-xs">
      <MousePointerClickIcon className="h-3.5 w-3.5 text-primary shrink-0" />
      {hoverInfo ? (
        <span className="truncate">
          <code className="font-mono text-foreground mr-1.5">&lt;{hoverInfo.tag}&gt;</code>
          <span className="text-muted-foreground">{hoverInfo.text}</span>
        </span>
      ) : (
        <span className="text-muted-foreground">
          Move your mouse over the page to select elements
        </span>
      )}
    </div>
  );
}