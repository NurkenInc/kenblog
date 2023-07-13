import { buttonVariants } from '@/shared/ui/Button/button';
import { NavigationMenu, NavigationMenuList } from "@/shared/ui/NavigationMenu/navigation-menu";
import { AvatarDropdown } from '@/widgets/Navbar/ui/AvatarDropdown/AvatarDropdown';
import { getAuthSession } from '@/shared/libs/configs/session/session';
import { MainNavItem } from '@/shared/libs/types/nav/nav';
import { NavbarItem } from '../NavbarItem/NavbarItem';
import { DropdownItem } from '@/shared/libs/types/dropdown/dropdown';

interface NavbarProps {
  items?: MainNavItem[],
  dropdownItems: DropdownItem[],
}

export const Navbar = async (props: NavbarProps) => {
  const { items, dropdownItems } = props;
  const session = await getAuthSession();

  const navContent = items?.map(item => (
    <NavbarItem key={item.title} item={item} />
  ))

  return (
    <NavigationMenu className="w-full border-b px-6 py-3">
      <NavigationMenuList className="flex items-center justify-between w-full">
        <div className='flex gap-10'>
          <NavbarItem
            item={{
              title: 'KenBlog',
              href: '/feed',
            }}
            className='font-bold text-blue-500'
          />
          <div className='flex gap-2'>
            {navContent}
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          {session?.user ? (
            <>
              <AvatarDropdown dropdownItems={dropdownItems} avatar={session?.user?.image} name={session?.user?.name} />
              <NavbarItem 
                item={{
                  href: '/protected/create-post',
                  title: 'Write Post'
                }}
                className={buttonVariants()}
              />
            </>
          ) : (
            <NavbarItem 
              item={{
                href: '/auth',
                title: 'Login'
              }}
              className={buttonVariants()}
            />
          )}
        </div>
      </NavigationMenuList> 
    </NavigationMenu>
  )
}