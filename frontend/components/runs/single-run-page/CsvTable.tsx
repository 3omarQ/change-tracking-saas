import { parseCsv } from '@/lib/parse-csv';

interface Props { text: string; }

export function CsvTable({ text }: Props) {
  const { headers, rows } = parseCsv(text);

  return (
    <div className="rounded-md border border-border bg-background overflow-auto max-h-[480px]">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-muted z-10">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-3 py-2 border-b border-border font-medium">
                {h || `column_${i + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-border last:border-b-0">
              {headers.map((_, c) => (
                <td key={c} className="px-3 py-2 align-top">{row[c] ?? ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}