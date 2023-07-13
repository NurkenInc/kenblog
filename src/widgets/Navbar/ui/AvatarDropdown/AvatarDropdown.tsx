'use client';

import { DropdownItem } from '@/shared/libs/types/dropdown/dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/Avatar/avatar';
import { Button } from '@/shared/ui/Button/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui/DropdownMenu/dropdown-menu';
import Link from 'next/link';

interface AvatarDropdownProps {
  className?: string,
  avatar?: string | null,
  name?: string | null,
  dropdownItems?: DropdownItem[],
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
  const { 
    className,
    avatar = '',
    name = '',
    dropdownItems,
  } = props;

  const items = dropdownItems?.map((item) => (
    <DropdownMenuItem key={item.title}>
      {item.href ? (
        <Link href={item.href}>{item.title}</Link>
      ) : (
        <Button asChild onClick={item.onClick}>{item.title}</Button>
      )}
    </DropdownMenuItem>
  )) 

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          <Avatar>
            <AvatarImage src={avatar || ''} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          {name}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {items}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}