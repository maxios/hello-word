import {
  EyeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  SettingsIcon,
} from "@/components/icons";

export const TABS = [
  { name: "home", label: "Home", Icon: HomeIcon, href: "/home" },
  { name: "catalog", label: "Catalog", Icon: MagnifyingGlassIcon, href: "/catalog" },
  { name: "compose", label: "Compose", Icon: PencilIcon, href: "/compose" },
  { name: "settings", label: "Settings", Icon: SettingsIcon, href: "/settings" },
  { name: "playground", label: "Playground", Icon: EyeIcon, href: "/playground" },
] as const;

export type TabItem = (typeof TABS)[number];
