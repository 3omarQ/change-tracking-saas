'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ElementPickerContent } from './ElementPickerContent';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  onConfirm: (selector: string) => void;
}

export function ElementPickerModal({ open, onOpenChange, url, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[90vw] h-[88vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-5 py-3 border-b border-border shrink-0">
          <DialogTitle className="text-sm font-medium">Select a datapoint</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ElementPickerContent
            url={url}
            onConfirm={(sel) => { onConfirm(sel); onOpenChange(false); }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}