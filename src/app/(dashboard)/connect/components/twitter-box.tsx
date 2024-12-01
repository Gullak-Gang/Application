"use client";

import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { CardContent, CardHeader } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import ShinyButton from "@/components/ui/shiny-button";
import { Spinner } from "@/components/ui/spinner";
import { getAuthUrl, revokeToken } from "@/lib/actions/twitter";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ImageIcon, ThumbsUp, TwitterIcon, UserCheck, UserPlus } from "lucide-react";
import { useFormStatus } from "react-dom";

const TwitterConnectBox = ({ twitterUser }: { twitterUser: any }) => {
  return (
    <MagicCard className="flex justify-center items-center w-full aspect-video">

      {twitterUser ? (
        <section className="flex flex-col justify-center items-center gap-4">
          <AnimatedShinyText className="text-center text-2xl font-semibold">Connect Account</AnimatedShinyText>
          <TwitterProfileCard profile={twitterUser} />

          <form action={revokeToken}>
            <TwitterButton text="Disconnect" />
          </form>

        </section>
      ) : (
        <form action={getAuthUrl}>
          <TwitterButton text="Connect Account" />
        </form>

      )
      }
    </MagicCard >
  );
};

export default TwitterConnectBox;

const TwitterButton = ({ text }: { text?: string }) => {
  const { pending } = useFormStatus();
  return <ShinyButton>{pending ? <Spinner /> : text}</ShinyButton>;
};

const TwitterProfileCard = ({ profile }: { profile: any }) => {
  const {
    profile_image_url,
    name,
    username,
    public_metrics: { followers_count, following_count, tweet_count, like_count, media_count },
  } = profile;

  return (
    <MagicCard>
      <CardHeader className="flex items-center justify-center gap-4">
        <Avatar>
          <AvatarImage className="w-16 h-16 rounded-full" src={profile_image_url ?? ''} alt={name} />
          <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </CardHeader>

      <CardContent className="mt-4 grid auto-rows-min gap-8 grid-cols-2">
        <div className="flex items-center">
          <TwitterIcon className="mr-2 text-blue-500" name="tweet" />
          <p>{tweet_count} Tweets</p>
        </div>
        <div className="flex items-center">
          <ThumbsUp className="mr-2 text-blue-500" name="like" />
          <p>{like_count} Likes</p>
        </div>
        <div className="flex items-center">
          <UserPlus className="mr-2 text-primary text-blue-500" name="followers" />
          <p>{followers_count} Followers</p>
        </div>
        <div className="flex items-center">
          <UserCheck className="mr-2 text-primary text-blue-500" name="following" />
          <p>{following_count} Following</p>
        </div>
        <div className="flex items-center">
          <ImageIcon className="mr-2 text-primary text-blue-500" name="media" />
          <p>{media_count} Media</p>
        </div>
      </CardContent>
    </MagicCard>
  );
};