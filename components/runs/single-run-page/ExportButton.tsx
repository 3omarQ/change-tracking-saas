import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadFile } from '@/lib/download-file';

const MIME: Record<string, string> = {
  json: 'application/json;charset=utf-8',
  csv: 'text/csv;charset=utf-8',
  md: 'text/plain;charset=utf-8',
  txt: 'text/plain;charset=utf-8',
};

interface Props { text: string; format: string; }

export function ExportButton({ text, format }: Props) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="gap-1.5"
      onClick={() => downloadFile(text, `result.${format}`, MIME[format] ?? MIME.txt)}
    >
      <DownloadIcon className="h-3.5 w-3.5" />
      Export
    </Button>
  );
}