"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";

type Item = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type Props = HTMLAttributes<HTMLDivElement> & {
  items: Item[];
  title?: string;
};

export function NavGroup({ items, title, ...props }: Props) {
  const pathName = usePathname();

  return (
    <SidebarGroup {...props}>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild className="my-1 py-4" isActive={pathName === item.url}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
