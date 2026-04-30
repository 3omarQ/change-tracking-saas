'use client';
import { useEffect, useRef } from 'react';
import { useDatapointPreview } from '@/hooks/useDatapointPreview';
import { useElementPicker } from '@/hooks/useElementPicker';
import { ElementPickerBrowser } from './ElementPickerBrowser';
import { ElementPickerToolbar } from './ElementPickerToolbar';
import { ElementPickerSidebar } from './ElementPickerSidebar';
import { PreviewError } from '../../datapoint-detail/PreviewError';
import { PreviewSkeleton } from '../../datapoint-detail/PreviewSkeleton';

interface Props {
  url: string;
  onConfirm: (data: {
    selector: string;
    fieldNames: string[];
    paginationSelector?: string;
    maxPages?: number;
  }) => void;
}

export function ElementPickerContent({ url, onConfirm }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stableHtml = useRef<string | null>(null);

  const { html, status, error, load } = useDatapointPreview(url, '');
  const picker = useElementPicker(iframeRef);

  const handleConfirm = () => {
    onConfirm({
      selector: picker.getFinalSelector(),
      fieldNames: picker.fields.map((f) => f.name || f.label),
      paginationSelector: picker.pagination?.selector,
      maxPages: picker.pagination?.maxPages,
    });
  };

  useEffect(() => {
    stableHtml.current = null;
    picker.reset();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (html && !stableHtml.current) stableHtml.current = html;
  const iframeHtml = stableHtml.current ?? html;

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
        <ElementPickerToolbar hoverInfo={picker.hoverInfo} />
        <div className="flex-1 relative overflow-hidden">
          {!iframeHtml && status === 'loading' && <PreviewSkeleton />}
          {status === 'error' && <PreviewError message={error ?? 'Failed to load'} />}
          {iframeHtml && <ElementPickerBrowser ref={iframeRef} html={iframeHtml} />}
        </div>
      </div>

      <ElementPickerSidebar
        captureMode={picker.captureMode}
        fields={picker.fields}
        pagination={picker.pagination}
        pickingPagination={picker.pickingPagination}
        onSetMode={picker.setMode}
        onRemoveField={picker.removeField}
        onRenameField={picker.renameField}
        onStartPickingPagination={picker.startPickingPagination}
        onClearPagination={picker.clearPagination}
        onSetMaxPages={picker.setMaxPages}
        onConfirm={handleConfirm}
        onReset={picker.reset}
      />
    </div>
  );
}