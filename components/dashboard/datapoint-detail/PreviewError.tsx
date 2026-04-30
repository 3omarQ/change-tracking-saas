import { AlertTriangleIcon } from "lucide-react";

export function PreviewError({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
            <AlertTriangleIcon className="h-8 w-8 text-muted-foreground" />
            <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Preview unavailable</p>
                <p className="text-xs text-muted-foreground max-w-xs">{message}</p>
            </div>
        </div>
    );
}