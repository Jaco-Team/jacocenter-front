import { NavPanel } from "@/widgets/NavPanel/ui/NavPanel";

export default function NavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <NavPanel />
      <main className="flex-1 mx-5 my-3 min-w-0">
        {children}
      </main>
    </div>
  );
}