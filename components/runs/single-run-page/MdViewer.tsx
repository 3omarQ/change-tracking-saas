import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MdViewer({ text }: { text: string }) {
    return (
        <div className="rounded-md border border-border bg-background px-5 py-4 text-sm overflow-x-auto
                    [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted-foreground [&_ul]:mb-3
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-muted-foreground [&_ol]:mb-3
                    [&_li]:mb-1
                    [&_strong]:text-foreground [&_strong]:font-medium
                    [&_code]:text-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-foreground
                    [&_pre]:bg-muted [&_pre]:border [&_pre]:border-border [&_pre]:rounded-md [&_pre]:p-3 [&_pre]:mb-3
                    [&_table]:w-full [&_table]:text-xs [&_table]:border-collapse [&_table]:mb-3
                    [&_th]:text-left [&_th]:px-3 [&_th]:py-2 [&_th]:font-medium [&_th]:text-foreground [&_th]:bg-muted/50 [&_th]:border [&_th]:border-border
                    [&_td]:px-3 [&_td]:py-2 [&_td]:text-muted-foreground [&_td]:border [&_td]:border-border [&_td]:align-top
                    [&_tr:hover_td]:bg-muted/30
                    [&_hr]:border-border [&_hr]:my-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
    );
}