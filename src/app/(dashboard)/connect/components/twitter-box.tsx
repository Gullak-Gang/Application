"use client";

import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MagicCard } from "@/components/ui/magic-card";
import ShinyButton from "@/components/ui/shiny-button";
import { Spinner } from "@/components/ui/spinner";
import { type Twitter_User, addFormDataToDB, getAuthUrl, revokeToken } from "@/lib/actions/twitter";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ThumbsUp, TwitterIcon, UserCheck, UserPlus } from "lucide-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

const TwitterConnectBox = ({ twitterUser }: { twitterUser: Twitter_User }) => {
  return (
    <MagicCard className="flex justify-center items-center w-full min-h-80">
      {twitterUser ? (
        <section className="flex flex-col justify-center items-center gap-8">
          <AnimatedShinyText className="text-center text-2xl font-semibold">Connected Account</AnimatedShinyText>

          <div className="flex flex-wrap justify-center flex-col md:flex-row gap-4">
            <TwitterProfileCard profile={twitterUser} />
            <TwitterHashInput />
          </div>
        </section>
      ) : (
        <form action={getAuthUrl}>
          <TwitterButton text="Connect Account" />
        </form>
      )}
    </MagicCard>
  );
};

export default TwitterConnectBox;

const TwitterButton = ({ text, ...props }: { text?: string } & Partial<ComponentProps<typeof ShinyButton>>) => {
  const { pending } = useFormStatus();
  return <ShinyButton type="submit" {...props}>{pending ? <Spinner /> : text}</ShinyButton>;
};

const TwitterProfileCard = ({ profile }: { profile: Twitter_User }) => {
  if (!profile) return null;

  const { profile_image_url, name, username, public_metrics } = profile;

  return (
    <Card>
      <CardHeader className="flex items-center justify-center gap-4">
        <Avatar>
          <AvatarImage className="w-16 h-16 rounded-full" src={profile_image_url ?? ""} alt={name} />
          <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-center">
          <AnimatedShinyText className="font-semibold text-lg">{name}</AnimatedShinyText>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </CardHeader>

      <CardContent className="mt-4 grid auto-rows-min gap-8 grid-cols-2">
        <div className="flex items-center">
          <TwitterIcon className="mr-2 text-blue-500" name="tweet" />
          <p>{public_metrics?.tweet_count} Tweets</p>
        </div>
        <div className="flex items-center">
          <ThumbsUp className="mr-2 text-blue-500" name="like" />
          <p>{public_metrics?.listed_count} Listed</p>
        </div>
        <div className="flex items-center">
          <UserPlus className="mr-2 text-primary text-blue-500" name="followers" />
          <p>{public_metrics?.followers_count} Followers</p>
        </div>
        <div className="flex items-center">
          <UserCheck className="mr-2 text-primary text-blue-500" name="following" />
          <p>{public_metrics?.following_count} Following</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <form action={revokeToken}>
          <TwitterButton text="Disconnect" />
        </form>
      </CardFooter>
    </Card>
  );
};

const TwitterHashInput = () => {
  return (
    <Card>
      <CardContent>
        <form action={addFormDataToDB} className="space-y-4 max-w-md">
          <AnimatedShinyText className="font-semibold text-lg text-center">Hashtag</AnimatedShinyText>
          <Input type="text" id="hashtag" name="hashtag" placeholder="Hashtag (e.g., #BlackFridaySale)" className="w-full" prefix="#" />

          <AnimatedShinyText className="font-semibold text-lg text-center">No of Posts</AnimatedShinyText>
          <Input type="text" id="posts" name="posts" placeholder="No of Posts" className="w-full" />
          <TwitterButton text="Add Hashtag" className="w-full" />
        </form>
      </CardContent>
    </Card>
  );
};