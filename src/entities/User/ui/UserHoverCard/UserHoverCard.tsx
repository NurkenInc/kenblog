import { Newspaper } from 'lucide-react';
import { UserAvatar } from '../UserAvatar/UserAvatar'
import Link from 'next/link'
import { buttonVariants } from '@/shared/ui/Button/button'
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/ui/HoverCard/hover-card'
import { ReactNode } from 'react'

interface UserHoverCardProps {
  trigger: ReactNode,
  username: string,
  userId: string,
  image?: string | null,
  description?: string | null,
  postsCount?: string,
}

export const UserHoverCard = (props: UserHoverCardProps) => {
  const {
    trigger,
    username,
    userId,
    image = '',
    description,
    postsCount = 0,
  } = props;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <UserAvatar
            src={image}
            fallback={username}
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{username}</h4>
            <p className="text-sm max-h-10 truncate breaks-word w-50">
              {description}
            </p>
            <div className="flex items-center pt-2">
              <Newspaper className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {postsCount && (<>Written {postsCount} interesting posts</>)}
              </span>
            </div>
            <Link className={buttonVariants()} href={`/user/${userId}/profile`}>View profile</Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
