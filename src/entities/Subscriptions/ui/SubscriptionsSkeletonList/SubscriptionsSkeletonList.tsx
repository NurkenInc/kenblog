import { SubscriptionsSkeletonListItem } from '../SubscriptionsSkeletonListItem/SubscriptionsSkeletonListItem';

interface SubscriptionsSkeletonListProps {
  amount?: number,
}

export const SubscriptionsSkeletonList = (props: SubscriptionsSkeletonListProps) => {
  const { 
    amount = 7,
  } = props;

  const skeletons = new Array(amount).fill('0').map((_, index) => (
    <SubscriptionsSkeletonListItem key={index} />
  ))

  return (
    <div className='h-max'>
      {skeletons}
    </div>
  );
}