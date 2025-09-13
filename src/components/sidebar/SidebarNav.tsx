"use client";
import { type LucideIcon } from "lucide-react";
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/types/user";

export function SidebarNav({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | IconType;
    allowedRoles: UserRole[];
  }[];
}) {
  const { user } = useAppSelector((state) => state.userReducer);
  const path = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={path === item.url}
            className="group/collapsible"
          >
            {user?.role && item.allowedRoles.includes(user.role) && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`font-secondary font-medium cursor-pointer text-typography-75 hover:text-brand-100 rounded-sm px-4 my-0.5 py-5 ${
                    path === item.url
                      ? "bg-brand-10 font-semibold hover:bg-brand-10 text-brand-100"
                      : "hover:bg-brand-10"
                  }`}
                >
                  <Link
                    href={item.url}
                    className="flex items-center space-x-2.5"
                  >
                    {item.icon && <item.icon size={18} className="shrink-0" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
