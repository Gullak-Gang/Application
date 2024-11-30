"use client";

import { getAuthUrl } from "@/actions/twitter";
import { MagicCard } from "@/components/ui/magic-card";
import ShinyButton from "@/components/ui/shiny-button";
import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";

const TwitterConnectBox = () => {
  return (
    <MagicCard className="flex justify-center items-center w-full aspect-video">
      <form action={getAuthUrl}>
        <TwitterConnect />
      </form>
    </MagicCard>
  );
};

export default TwitterConnectBox;

const TwitterConnect = () => {
  const { pending } = useFormStatus();

  return <ShinyButton>{pending ? <Spinner /> : "Connect with Twitter"}</ShinyButton>;
};
