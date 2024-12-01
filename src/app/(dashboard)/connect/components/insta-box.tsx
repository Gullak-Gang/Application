"use client";

import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MagicCard } from "@/components/ui/magic-card";
import ShinyButton from "@/components/ui/shiny-button";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { addFormDataToDB, disconnectInsta, Insta_User } from "@/lib/actions/instagram";
import { HelpCircleIcon } from "lucide-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

const InstaConnectBox = ({ instagramUser }: { instagramUser: Insta_User }) => {

  if (instagramUser) return (
    <Card>
      <CardHeader className="flex items-center justify-center gap-4">
        <AnimatedShinyText className="font-semibold text-lg">Connected Instagram Account</AnimatedShinyText>
      </CardHeader>
      <CardFooter className="flex items-center justify-center">
        <form action={disconnectInsta}>
          <InstaConnect text="Disconnect" />
        </form>
      </CardFooter>
    </Card >
  )

  return (
    <MagicCard className="flex justify-center items-center w-full min-h-80">
      <Card className="p-4">
        <CardContent>
          <form className="flex flex-col space-y-4" action={addFormDataToDB}>
            {/* Instructions */}
            <div className="flex justify-between items-center">
              <div className="w-full flex justify-center items-center gap-2">
                <AnimatedShinyText className="font-semibold text-lg text-center">Access Token</AnimatedShinyText>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircleIcon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <h4 className="font-semibold mb-2">To get your Instagram access token:</h4>
                    <ul className="pl-4 space-y-2">
                      <li>
                        1. Create an account at <a href="https://apify.com" className="underline">https://apify.com</a>
                      </li>
                      <li>
                        2. Go to <a href="https://console.apify.com/settings/integrations" className="underline">https://console.apify.com/settings/integrations</a>
                      </li>
                      <li>3. Generate an API token</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Input type="text" name="apifyToken" placeholder="Access Token" className="w-full" required />

            <AnimatedShinyText className="font-semibold text-lg text-center">Hashtag</AnimatedShinyText>
            <Input type="text" name="hashtag" placeholder="Hashtag (e.g., #nature)" className="w-full" required />

            <AnimatedShinyText className="font-semibold text-lg text-center">No of Posts</AnimatedShinyText>
            <Input
              type="number"
              name="posts"
              placeholder="Number of Posts"
              inputMode="numeric"
              className="w-full no-arrows"
              min={1}
              required
            />
            <InstaConnect />
          </form>
        </CardContent>
      </Card>
    </MagicCard>
  );
};

const InstaConnect = ({ text, ...props }: { text?: string } & Partial<ComponentProps<typeof ShinyButton>>) => {
  const { pending } = useFormStatus();

  return <ShinyButton className="w-full" {...props}>{pending ? <Spinner /> : text ?? "Connect with instagram"}</ShinyButton>;
};
export default InstaConnectBox;
