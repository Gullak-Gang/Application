import { BotIcon, FileTextIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export const features = [
  {
    Icon: FileTextIcon,
    name: "Analysis using custom data",
    description: "upload csv file to do analysis to find insights",
    href: "/connect",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: "",
  },
  {
    Icon: TwitterIcon,
    name: "Analytics with Tweets",
    description: "Analyze tweets to find insights and trends.",
    href: "/connect",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: "",
  },
  {
    Icon: InstagramIcon,
    name: "Instagram Analytics",
    description: "Analyze Instagram posts to find insights and trends.",
    href: "/connect",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: "",
  },
  {
    Icon: BotIcon,
    name: "AI Assistant",
    description: "Use the AI chatbot to get answers to your questions.",
    className: "col-span-3 lg:col-span-1",
    href: "/assistant",
    cta: "Learn more",
    background: "",
  },
];
