import { Result } from '@/types/dashboard.types';
import { ExportButton } from './ExportButton';
import { CsvTable } from './CsvTable';
import { MdViewer } from './MdViewer';

function extractText(result: Result): string {
  const def = result.definition as Record<string, unknown>;
  if (typeof def?.text === 'string') return def.text;
  if (typeof def?.output === 'string') return def.output;
  return JSON.stringify(def, null, 2);
}


interface Props {
  results: Result[], format: string;
}

export function ExecutionResult({ results, format }: Props) {
  if (results.length === 0)
    return <div className="text-sm text-muted-foreground">No results recorded.</div>;

  const text = extractText(results[0]);
  const normalizedFormat = format.toLowerCase();

  return (
    <div className="space-y-3 ">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Result</h2>
        <ExportButton text={text} format={normalizedFormat} />
      </div>

      <div className='max-h-[480px] overflow-y-auto'>
        {normalizedFormat === 'csv' && <CsvTable text={text} />}
        {normalizedFormat === 'md' && <MdViewer text={text} />}
        {normalizedFormat !== 'csv' && normalizedFormat !== 'md' && (
          <pre className="rounded-md border border-border bg-muted px-4 py-3 text-xs font-mono whitespace-pre-wrap break-words">
            {text}
          </pre>
        )}
      </div>
    </div>
  );
}