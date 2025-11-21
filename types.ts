import { LucideIcon } from "lucide-react";

export enum Page {
  HOME = 'Home',
  SERVER = 'Server Info',
  MAP = 'World Map',
  SHOP = 'Store',
  COMMUNITY = 'Community',
}

export interface NavItem {
  id: Page;
  icon: LucideIcon;
  label: string;
  description: string;
}

export interface RadialMenuProps {
  items: NavItem[];
  activeId: Page;
  onSelect: (id: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}