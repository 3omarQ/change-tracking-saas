import { CheckIcon, ListIcon, TypeIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CaptureMode, Field } from '@/hooks/useElementPicker';

interface Props {
  captureMode: CaptureMode;
  fields: Field[];
  onSetMode: (m: CaptureMode) => void;
  onRemoveField: (sel: string) => void;
  onConfirm: () => void;
  onReset: () => void;
}

export function ElementPickerSidebar({
  captureMode, fields,
  onSetMode, onRemoveField, onConfirm, onReset,
}: Props) {
  return (
    <div className="w-72 shrink-0 flex flex-col gap-4 p-4 bg-muted/30">

      {/* Mode selector */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">What to capture</p>
        <div className="grid grid-cols-2 gap-2">
          {(['text', 'list'] as CaptureMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onSetMode(m)}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors',
                captureMode === m
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
              )}
            >
              {m === 'text'
                ? <TypeIcon className="h-3.5 w-3.5" />
                : <ListIcon className="h-3.5 w-3.5" />}
              {m === 'text' ? 'Text' : 'List'}
            </button>
          ))}
        </div>

        {/* Mode description */}
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {captureMode === 'text'
            ? 'Click any element. Only that element is captured.'
            : 'Click any element from a repeated list. All matching items are captured. Add more fields if needed.'}
        </p>
      </div>

      <div className="border-t border-border" />

      {/* Fields */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        <p className="text-xs font-medium text-foreground">
          {fields.length > 0
            ? `${fields.length} field${fields.length > 1 ? 's' : ''} selected`
            : 'Nothing selected yet'}
        </p>

        {fields.length > 0 ? (
          <div className="space-y-1 overflow-y-auto">
            {fields.map((f) => (
              <div
                key={f.sel}
                className="flex items-start gap-2 bg-muted rounded px-2 py-1.5 group"
              >
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[11px] text-muted-foreground truncate">{f.label}</p>
                  <code className="text-[10px] font-mono block truncate text-foreground">
                    {f.sel}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveField(f.sel)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0"
                >
                  <XIcon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            {captureMode === 'text'
              ? 'Click an element on the page to capture it.'
              : 'Click any item from the list you want to track.'}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2 border-t border-border">
        <Button
          type="button"
          size="sm"
          className="w-full gap-1.5"
          disabled={fields.length === 0}
          onClick={onConfirm}
        >
          <CheckIcon className="h-3.5 w-3.5" />
          Use selection
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          disabled={fields.length === 0}
          onClick={onReset}
        >
          <XIcon className="h-3.5 w-3.5" />
          Clear all
        </Button>
      </div>

    </div>
  );
}