import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/Avatar/avatar'
import { ReactNode } from 'react'

interface UserAvatarProps {
  src?: string | null,
  fallback?: ReactNode | null,
  className?: string,
  w?: number | string,
  h?: number | string,
}

export const UserAvatar = (props: UserAvatarProps) => {
  const {
    src,
    fallback,
    className,
    w = 20,
    h = 20,
  } = props;
  
  return (
    <Avatar className={className}>
      <AvatarImage width={w} height={h} src={src || ''} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
