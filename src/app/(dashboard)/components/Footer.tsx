"use client";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export function Footer() {
  const session = authClient.useSession();
  function handleSignOut() {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            redirect("/authentication");
          }
        }
      });
    }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="flex items-center gap-2 py-4">
              <div className="flex items-center gap-3 text-ellipsis">
                <Avatar>
                  <AvatarFallback className="h-full w-full flex justify-center items-center bg-gray-200 rounded-sm">
                    JE
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <p className="text-sm">{session.data?.user.clinic?.name}</p>
                  <p className="text-sm text-muted-foreground text-ellipsis whitespace-nowrap">
                    {session.data?.user.email}
                  </p>
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
