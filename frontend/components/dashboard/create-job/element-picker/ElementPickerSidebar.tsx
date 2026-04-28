import { CheckIcon, ListIcon, TypeIcon, XIcon, ChevronRightIcon, MousePointerIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CaptureMode, Field, PaginationConfig } from '@/hooks/useElementPicker';

interface Props {
  captureMode: CaptureMode;
  fields: Field[];
  pagination: PaginationConfig | null;
  pickingPagination: boolean;
  onSetMode: (m: CaptureMode) => void;
  onRemoveField: (sel: string) => void;
  onRenameField: (sel: string, name: string) => void;
  onStartPickingPagination: () => void;
  onClearPagination: () => void;
  onSetMaxPages: (n: number) => void;
  onConfirm: () => void;
  onReset: () => void;
}

export function ElementPickerSidebar({
  captureMode, fields, pagination, pickingPagination,
  onSetMode, onRemoveField, onRenameField,
  onStartPickingPagination, onClearPagination, onSetMaxPages,
  onConfirm, onReset,
}: Props) {
  return (
    <div className="w-72 shrink-0 flex flex-col gap-4 p-4 bg-muted/30 overflow-y-auto">

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
              {m === 'text' ? <TypeIcon className="h-3.5 w-3.5" /> : <ListIcon className="h-3.5 w-3.5" />}
              {m === 'text' ? 'Text' : 'List'}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {captureMode === 'text'
            ? 'Click any element. Only that element is captured.'
            : 'Click any element from a repeated list. All matching items are captured.'}
        </p>
      </div>

      <div className="border-t border-border" />

      {/* Fields */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-foreground">
          {fields.length > 0
            ? `${fields.length} field${fields.length > 1 ? 's' : ''} selected`
            : 'Nothing selected yet'}
        </p>

        {fields.length > 0 ? (
          <div className="space-y-1">
            {fields.map((f) => (
              <div key={f.sel} className="flex items-start gap-2 bg-muted rounded px-2 py-1.5 group">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-[11px] text-muted-foreground truncate">{f.label}</p>
                  <code className="text-[10px] font-mono block truncate text-foreground">{f.sel}</code>
                  <Input
                    value={f.name ?? ''}
                    onChange={(e) => onRenameField(f.sel, e.target.value)}
                    placeholder="Field name"
                    className="h-7 text-[11px]"
                  />
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

      {/* Pagination — only in list mode */}
      {captureMode === 'list' && (
        <>
          <div className="border-t border-border" />
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Multi-page extraction</p>

            {pagination ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded px-2 py-1.5">
                  <ChevronRightIcon className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <code className="text-[10px] font-mono truncate flex-1 text-amber-800 dark:text-amber-300">
                    {pagination.selector}
                  </code>
                  <button type="button" onClick={onClearPagination}>
                    <XIcon className="h-3 w-3 text-amber-600 hover:text-amber-800" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-[11px] text-muted-foreground shrink-0">Max pages</p>
                  <Input
                    type="number"
                    min={2}
                    max={50}
                    value={pagination.maxPages}
                    onChange={(e) => onSetMaxPages(Number(e.target.value))}
                    className="h-7 text-[11px] w-20"
                  />
                  <p className="text-[11px] text-muted-foreground">(max 50)</p>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Optionally click the &quot;next page&quot; button on the page to scrape across multiple pages.
                </p>
                <button
                  type="button"
                  onClick={onStartPickingPagination}
                  className={cn(
                    'w-full flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors',
                    pickingPagination
                      ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300'
                      : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  <MousePointerIcon className="h-3.5 w-3.5" />
                  {pickingPagination ? 'Click the next page button...' : 'Pick next page button'}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Actions */}
      <div className="space-y-2 pt-2 border-t border-border mt-auto">
        <Button
          type="button" size="sm" className="w-full gap-1.5"
          disabled={fields.length === 0}
          onClick={onConfirm}
        >
          <CheckIcon className="h-3.5 w-3.5" />
          Use selection
        </Button>
        <Button
          type="button" variant="ghost" size="sm"
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