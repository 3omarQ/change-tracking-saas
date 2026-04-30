export function JobDetailField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-8">
      <p className="text-xs text-muted-foreground w-36 shrink-0">{label}</p>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
