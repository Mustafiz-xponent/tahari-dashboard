import { AppSidebar } from "@/app/(dashboard)/_components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full overflow-x-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b  px-4">
          <SidebarTrigger className="cursor-pointer text-gray-500 hover:text-gray-600 absolute border-[1px] border-gray-200 bg-gray-50 z-10" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 bg-brand-5">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
