import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";

export default function DashbaordLayout() {
  const token = useUserStore((state) => state.user);
  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        
        </header>

        <section className="m-5">
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
