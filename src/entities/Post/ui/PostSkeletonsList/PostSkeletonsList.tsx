import { PostListItemSkeleton } from '../PostListItemSkeleton/PostListItemSkeleton';

interface PostSkeletonsListProps {
  amount?: number,
}

export const PostSkeletonsList = (props: PostSkeletonsListProps) => {
  const { 
    amount = 6,
  } = props;

  const skeletons = new Array(amount).fill('0').map((_, index) => (
    <PostListItemSkeleton key={index} />
  ))

  return (
    <div className='h-[90vh]'>
      {skeletons}
    </div>
  );
}