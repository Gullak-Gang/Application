"use client";

import { Input } from "@/components/ui/input";
import { MagicCard } from "@/components/ui/magic-card";
import ShinyButton from "@/components/ui/shiny-button";
import { Spinner } from "@/components/ui/spinner";
import { saveToDB } from "@/lib/actions/instagram";
import { useFormStatus } from "react-dom";

const InstaConnectBox = () => {
  return (
    <MagicCard className="flex justify-center items-center w-full aspect-video">
      <form action={saveToDB} className="flex flex-col space-y-4">
        <Input type="text" name="access_token" placeholder="Access Token" className="w-3/4" required />

        {/* Instructions */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Need help?</span>
          <button
            type="button"
            onClick={() => alert("To get your Instagram access token:\n1. Create an account at https://apify.com\n2. Go to https://console.apify.com/settings/integrations\n3. Generate an API token")}
            className="text-blue-600 hover:text-blue-800"
          >
            Get instructions
          </button>
        </div>

        <Input type="text" name="hashtag" placeholder="Hashtag (e.g., #nature)" className="w-3/4" required />
        <Input
          type="number"
          name="number_of_posts"
          placeholder="Number of Posts"
          inputMode="numeric"
          className="w-3/4 no-arrows"
          min={1}
          required
        />
        <InstaConnect />
      </form>
    </MagicCard>
  );
};

const InstaConnect = () => {
  const { pending } = useFormStatus();

  return <ShinyButton className="w-3/4">{pending ? <Spinner /> : "Connect with instagram"}</ShinyButton>;
};
export default InstaConnectBox;
