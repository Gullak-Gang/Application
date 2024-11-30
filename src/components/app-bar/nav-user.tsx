"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";
import { ThemeToggle } from "./theme-btn";

export function NavUser() {
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-row items-center justify-between gap-2 group-data-[state=collapsed]:flex-col-reverse">
        {user ? (
          <UserButton
            showName
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined,
              elements: {
                rootBox: "w-full",
                userButtonTrigger: "w-full",
                userButtonBox: "w-full flex-row-reverse justify-end p-2 gap-2 group-data-[state=collapsed]:gap-0",
                userButtonOuterIdentifier: "font-medium group-data-[state=collapsed]:hidden",
                avatarBox: "group-data-[state=collapsed]:size-5",
              },
            }}
            userProfileProps={{
              appearance: { baseTheme: resolvedTheme === "dark" ? dark : undefined },
            }}
          />
        ) : (
          <div className="flex flex-row gap-2 items-center flex-1 group-data-[state=collapsed]:gap-0">
            <Skeleton className="size-7 rounded-full aspect-square" />
            <div className="space-y-2 w-full flex-grow-1 peer-data-[state=collapsed]:hidden">
              <Skeleton className="h-3 w-2/3 rounded" />
              <Skeleton className="h-2 w-full rounded" />
            </div>
          </div>
        )}
        <ThemeToggle />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
