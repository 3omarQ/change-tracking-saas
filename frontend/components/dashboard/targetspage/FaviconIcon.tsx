import Image from "next/image";

export function FaviconIcon({ url }: { url: string }) {
    const domain = new URL(url).hostname;
    return (
        <Image
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
            alt={domain}
            width={16}
            height={16}
            className="h-4 w-4 rounded-sm object-contain"
            onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
            }}
        />
    );
}