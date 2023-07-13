'use client';

import { SidebarNavItem } from '@/shared/libs/types/nav/nav'
import Link from 'next/link'
import { cn } from '@/shared/libs/utils/utils'
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  item: SidebarNavItem
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { item } = props;
  const path = usePathname();

  return (
    item.href && (
      <Link key={item.title} href={item.disabled ? "/" : item.href} className='my-1'>
        <span
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            path === item.href ? "bg-accent" : "transparent",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </span>
      </Link>
    )
  )
}