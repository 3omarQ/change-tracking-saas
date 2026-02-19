import { TopBarWrapper } from "@/components/dashboard/TopBarWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <TopBarWrapper user={{ name: "Omar", email: "omar@example.com" }} />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
