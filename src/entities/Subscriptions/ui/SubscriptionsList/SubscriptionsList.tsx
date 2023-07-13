import { SubscriptionsListItem } from '../SubscriptionsListItem/SubscriptionsListItem';
import { User } from '@prisma/client';

interface SubscriptionsListProps {
  subscriptions?: { user: User }[] | null,
}

export const SubscriptionsList = (props: SubscriptionsListProps) => {
  const { subscriptions } = props;

  if (!subscriptions?.length) {
    return (
      <p className='scroll-m-20 text-center border-b pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0 break-words'>
        You do not have any followings yet. But you always can follow!
      </p>
    )
  }

  return (
    <section>
      <p className='text-left scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0 break-words'>
        Your followings:
      </p>
      {subscriptions?.map(sub => (
        <div key={sub.user.id}>
          <SubscriptionsListItem user={sub.user} />
        </div>
      ))}
    </section>
  )
}