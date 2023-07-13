import { Skeleton } from '@/shared/ui/Skeleton/skeleton';

export const SubscriptionsSkeletonListItem = () => {
  return (
    <div className='flex items-center justify-center gap-3 my-2'>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div>
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  )
}