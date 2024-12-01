import { BotIcon, LifeBuoy, LucideLayoutDashboard, PlugZapIcon, SendIcon } from "lucide-react";

export const NAV_MAIN = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Connect",
    url: "/connect",
    icon: PlugZapIcon,
  },
  {
    title: "Assistant",
    url: "/assistant",
    icon: BotIcon,
  },
];

export const NAV_SECONDARY = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "/",
    icon: SendIcon,
  },
];
