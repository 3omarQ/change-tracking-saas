interface PreviewFrameProps {
    html: string;
}

export function PreviewFrame({ html }: PreviewFrameProps) {
    return (
        <iframe
            srcDoc={html}
            sandbox="allow-scripts"
            className="w-full h-full border-0"
            title="Datapoint preview"
        />
    );
}