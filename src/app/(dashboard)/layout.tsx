import { AppSidebar } from "@/components/app-bar";
import BreadCrumbGenerator from "@/components/breadcrumb";
import DotPattern from "@/components/ui/dot-pattern";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { cookies } from "next/headers";

const DashboadLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <>
      <SignedIn>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar variant="inset" collapsible="icon" />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 mb-4">
              {/* Sidebar trigger */}
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/* Breadcrumb */}
              <BreadCrumbGenerator />
            </header>
            <main className="px-4">
              {children}
              <DotPattern className={cn("[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]")} />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </SignedIn>

      <SignedOut>
        <main className="flex justify-center items-center gap-4 h-screen">
          Please sign in
          <SignInButton />
        </main>
      </SignedOut>
    </>
  );
};

export default DashboadLayout;
