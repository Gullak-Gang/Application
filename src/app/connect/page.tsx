import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Connect() {
  return (
    <section className="flex flex-col justify-center items-center gap-4 h-screen">
      <h1>Connect</h1>
      <Button asChild>
        <Link href="/api/twitter/connect">Connect with Twitter</Link>
      </Button>
    </section>
  );
}
