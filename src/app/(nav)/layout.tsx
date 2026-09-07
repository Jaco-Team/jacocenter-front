import { NavPanel } from "@/widgets/NavPanel/ui/NavPanel";
import { RequireAuth } from "@/features/auth/ui/RequireAuth/RequireAuth";

export default function NavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex h-screen">
        <NavPanel />
        <main className="flex-1 flex flex-col mx-4 my-3 min-w-0">
          {children}
        </main>
      </div>
    </RequireAuth>
  );
}