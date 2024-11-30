import { AppSidebar } from "@/components/app-bar";
import BreadCrumbGenerator from "@/components/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-separator";
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
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              {/* Sidebar trigger */}
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/* Breadcrumb */}
              <BreadCrumbGenerator />
            </header>
            <main>{children}</main>
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
