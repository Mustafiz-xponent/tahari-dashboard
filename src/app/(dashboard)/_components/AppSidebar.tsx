"use client";
import * as React from "react";
import { BsCartCheck } from "react-icons/bs";
import { PiFarmLight } from "react-icons/pi";
import { SidebarNav } from "@/app/(dashboard)/_components/SidebarNav";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { FaPeopleCarryBox, FaHandHoldingDollar } from "react-icons/fa6";
import {
  LayoutDashboard,
  Box,
  List,
  CalendarDays,
  MapPinHouse,
  MessagesSquare,
  BadgePercent,
  ChartColumnIncreasing,
  DollarSign,
} from "lucide-react";
import { UserRole } from "@/types/user";
const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Farmers",
    url: "/farmers",
    icon: PiFarmLight,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Categories",
    url: "/categories",
    icon: List,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Products",
    url: "/products",
    icon: Box,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Subscriptions",
    url: "/subscriptions",
    icon: CalendarDays,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Orders",
    url: "/orders",
    icon: BsCartCheck,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Inventories",
    url: "/inventories",
    icon: MdOutlineInventory2,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Order Trackings",
    url: "/order-trackings",
    icon: MapPinHouse,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SUPPORT],
  },
  {
    title: "Messaging",
    url: "/messaging",
    icon: MessagesSquare,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SUPPORT],
  },
  {
    title: "Farmer Transactions",
    url: "/farmers-transaction",
    icon: DollarSign,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Customers",
    url: "/customers",
    icon: FaPeopleCarryBox,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SUPPORT],
  },
  {
    title: "Deals",
    url: "/deals",
    icon: BadgePercent,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Promotions",
    url: "/promotions",
    icon: FaHandHoldingDollar,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Users",
    url: "/users",
    icon: IoPeopleOutline,
    allowedRoles: [UserRole.SUPER_ADMIN],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartColumnIncreasing,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton className="h-9 font-secondary font-bold text-typography-100  text-2xl">
          {!open && <span className="text-brand-100">T</span>}{" "}
          {open && (
            <p>
              <span className="text-brand-100">Tahari</span> <span>Foods</span>
            </p>
          )}
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav items={navItems} />
      </SidebarContent>
    </Sidebar>
  );
}
