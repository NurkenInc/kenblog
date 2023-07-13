import { ReactNode } from 'react';
import { SidebarNavItem } from '@/shared/libs/types/nav/nav';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { cn } from '@/shared/libs/utils/utils';

interface SidebarProps {
  items?: SidebarNavItem[],
  content?: ReactNode,
  className?: string,
}

export const Sidebar = async (props: SidebarProps) => {  
  const {
    items,
    content,
    className,
  } = props;

  const sidebarItems = items?.map(item =>  (
    <SidebarItem item={item} key={item.title} />
  ))

  return (
    <aside className={cn("grid grid-flow-row auto-rows-max text-sm p-4 w-[300px]", className)}>
      {(content) ?? (sidebarItems)}
    </aside>
  )
}