import { LifeBuoy, LucideLayoutDashboard, PlugZapIcon, SendIcon, TextCursorInputIcon } from "lucide-react";

export const NAV_MAIN = [
  {
    title: "Dashboard",
    url: "/",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Prompts",
    url: "/prompt",
    icon: TextCursorInputIcon,
  },
  {
    title: "Connect",
    url: "/connect",
    icon: PlugZapIcon,
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
