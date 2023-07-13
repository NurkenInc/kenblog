'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/shared/ui/Card/card';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { SubscriptionButton } from '@/entities/Subscriptions';
import { getUserDetails } from '@/shared/api/actions/users';
import { useQuery } from '@tanstack/react-query';

interface UserDetailsProps {
  userId: string
}

export const UserDetails = (props: UserDetailsProps) => {
  const { userId } = props;

  const { data: user, isFetching, isError } = useQuery({
    queryKey: ['user-details-query'],
    queryFn: () => getUserDetails({ userId, postsIncluded: true }),
    cacheTime: 300000,
  })

  if (isFetching || !user) {
    return <div>I am robot</div>
  }

  return (
    <div>
      <Card>
        <CardContent className='flex items-center gap-4'>
          <div className='p-4'>
            <UserAvatar
              w={'145px'}
              h={'145px'}
              src={user.image} 
              fallback={user.username}
              className='w-[145px] h-[145px]'
            />
          </div>
          <div>
            <CardTitle>{user.username}</CardTitle>
            <CardDescription>{user.description}</CardDescription>
            <div className='flex items-center justify-between mt-2'>
              <div className='text-center'>
                <p className='font-bold'>{user.subscriptions?.length || 0}</p>
                <p>Followers</p>
              </div>
              <div className='text-center'>
                <p className='font-bold'>{user.posts?.length}</p>
                <p>Posts</p>
              </div>
              {/* <SubscriptionButton userInView={user} /> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}