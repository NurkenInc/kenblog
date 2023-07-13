'use client';

import { SubscriptionsList } from '@/entities/Subscriptions';
import { useQuery } from '@tanstack/react-query';
import { buttonVariants } from '@/shared/ui/Button/button';
import { Bird } from 'lucide-react';
import { SubscriptionsSkeletonList } from '@/entities/Subscriptions';
import Link from 'next/link';
import { User } from '@prisma/client';
import { getSubscriptions } from '@/shared/api/actions/subscriptions';

interface UserSubscriptionsProps {
  user?: User,
}

export const UserSubscriptions = async (props: UserSubscriptionsProps) => {
  const { data, error, isFetching, refetch } = useQuery({
    queryFn: () => getSubscriptions(props?.user),
    queryKey: ['subscriptions-query'],
  })

  // useEffect(() => {
  //   if (session?.user) refetch();
  // }, [session?.user, refetch])

  if (!props?.user) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <p className='scroll-m-20 text-center border-b pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0 break-words'>
          Hey! How join our community and follow to other people to see other people and their interesting posts!
        </p>
        <Link href='/auth' className={buttonVariants() + 'mt-4'}>
          <Bird className='h-6 w-6 p-1' />
          Join
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <p className='scroll-m-20 text-center border-b pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0 break-words'>
          Something went wrong
        </p>
        <Link href='/auth' className={buttonVariants()}>
          <Bird className='h-6 w-6 p-1' />
          Join
        </Link>
      </div>
    )
  }

  if (isFetching) {
    return <SubscriptionsSkeletonList />
  }
  
  return (
    <div className='flex flex-col item-center justify-center p-4'>
      <SubscriptionsList subscriptions={data} />
    </div>
  )
}