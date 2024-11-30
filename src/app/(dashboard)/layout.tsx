import { AppSidebar } from "@/components/app-bar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

const DashboadLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </SignedIn>
      <SignedOut>
        <main className="flex justify-center items-center gap-4 h-screen">
          Please sign in
          <SignInButton />
        </main>
      </SignedOut>
    </>
  )
}

export default DashboadLayout