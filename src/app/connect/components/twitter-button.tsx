"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const TwitterConnect = () => {
  const { pending } = useFormStatus();

  return <Button>{pending ? "Connecting..." : "Connect with Twitter"}</Button>;
};

export default TwitterConnect;
