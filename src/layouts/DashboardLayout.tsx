import { AppSidebar } from "@/components/app-sidebar";
import { LogOut, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashbaordLayout() {
  const token = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.clearUser);

  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 sm:h-16 shrink-0 items-center justify-between gap-2 border-b px-2 sm:px-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <SidebarTrigger className="-ml-0.5 sm:-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-1 sm:mr-2 h-3 sm:h-4"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarFallback>
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 sm:w-56">
              <DropdownMenuItem onClick={handleLogout} className="py-2 sm:py-3">
                <LogOut className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <section className="m-2 sm:m-3 md:m-4 lg:m-5">
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
