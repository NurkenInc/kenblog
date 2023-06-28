'use client';

import { Button } from '@/shared/ui/Button/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/shared/ui/NavigationMenu/navigation-menu";
import { AvatarDropdown } from '@/widgets/AvatarDropdown/ui/AvatarDropdown';
import { AuthModal } from '@/widgets/Auth/ui/AuthModal/AuthModal';
import { memo } from 'react';

interface NavbarProps {
  className?: string,
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props
  const user = false;

  return (
    <NavigationMenu className="p-4 w-full m-0 border-b-2 h-[75px]">
      <NavigationMenuList className="flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-blue-500">
              KenBlog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
        <div className="flex justify-center items-center gap-4">
          {user ? (
            <>
              <NavigationMenuItem className="pt-[5px]">
                <AvatarDropdown />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button>Write Post</Button>
              </NavigationMenuItem>
            </>
            ) : (
            <NavigationMenuItem>
              <AuthModal 
                trigger={<Button>Login</Button>} 
              />
            </NavigationMenuItem>
          )}
        </div>
      </NavigationMenuList> 
    </NavigationMenu>
  )
})