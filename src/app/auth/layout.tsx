import { GuestOnly } from "@/features/auth/ui/GuestOnly/GuestOnly";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestOnly>
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
    </GuestOnly>
  );
}