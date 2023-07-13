import { ExtendedUser } from '@/shared/libs/types/db/db';
import { UserAvatar } from '@/entities/User';

interface SubscriptionsListItemProps {
  user: ExtendedUser,
}

export const SubscriptionsListItem = (props: SubscriptionsListItemProps) => {
  const { user } = props;

  return (
    <div className='flex items-center justify-center gap-3'>
      <UserAvatar 
        src={user.image}
        fallback={user.name}
      />
      <div>
        <div>{user.username}</div>
        <div className='w-full truncate max-h-10'>
          {user.description}
        </div>
      </div>
    </div>
  )
}