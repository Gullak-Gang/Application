import { getCurrentUser } from "@/services/twitter";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const user = await getCurrentUser();
  console.log(" user :: : :", user);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>HELLO {user?.name}</h1>
      <Image
        src={user?.profile_image_url ?? ""}
        alt={user?.username ?? ""}
        width={100}
        height={100}
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
