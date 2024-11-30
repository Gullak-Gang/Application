"use client";

import ShinyButton from "@/components/ui/shiny-button";
import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";

const TwitterConnect = () => {
  const { pending } = useFormStatus();

  return <ShinyButton>{pending ? <Spinner /> : "Connect with Twitter"}</ShinyButton>;
};

export default TwitterConnect;
