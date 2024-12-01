import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard")
  return (
    <div className="flex justify-center items-center">
      <Button>Hello World</Button>
    </div>
  );
}
