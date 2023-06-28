import { memo } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/shared/ui/NavigationMenu/navigation-menu";

export const Sidebar = memo(() => {
  return (
    <NavigationMenu className="w-[300px] border-l-2 min-h-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          Recent Posts
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
})