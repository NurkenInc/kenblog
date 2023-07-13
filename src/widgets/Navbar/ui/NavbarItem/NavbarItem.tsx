'use client'

import { MainNavItem } from '@/shared/libs/types/nav/nav'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/shared/libs/utils/utils'

interface NavbarItemProps {
  item: MainNavItem,
  className?: string
}

export const NavbarItem = (props: NavbarItemProps) => {
  const { item, className } = props;

  const segment = useSelectedLayoutSegment();
  
  return (
    <Link
      href={item.disabled ? "#" : item.href}
      className={cn(
        !className && "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
        item.href.startsWith(`/${segment}`)
          ? "text-foreground"
          : "text-foreground/60",
        item.disabled && "cursor-not-allowed opacity-80",
        className,
      )}
    >
      {item.title}
    </Link>
  )
}