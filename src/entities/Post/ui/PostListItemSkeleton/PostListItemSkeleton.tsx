import { Skeleton } from '@/shared/ui/Skeleton/skeleton';

export const PostListItemSkeleton = () => {
  return (
    <div className='py-6'>
      <div className="flex items-center space-x-4 py-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-40" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[200px] max-w-[780px]" />
      </div>
    </div>
  )
}