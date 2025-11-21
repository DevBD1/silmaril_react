import { 
  MountainSnow, 
  Scroll, 
  Map as MapIcon, 
  Gem, 
  Users, 
} from 'lucide-react';
import { NavItem, Page } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    id: Page.HOME,
    icon: MountainSnow,
    label: 'Home',
    description: 'The Shire',
  },
  {
    id: Page.SERVER,
    icon: Scroll,
    label: 'Realms',
    description: 'Server Status',
  },
  {
    id: Page.MAP,
    icon: MapIcon,
    label: 'Atlas',
    description: 'Middle-earth',
  },
  {
    id: Page.SHOP,
    icon: Gem,
    label: 'Treasury',
    description: 'Support Us',
  },
  {
    id: Page.COMMUNITY,
    icon: Users,
    label: 'Fellowship',
    description: 'Forum',
  },
];