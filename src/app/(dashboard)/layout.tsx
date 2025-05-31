import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </SidebarProvider>
  );
}