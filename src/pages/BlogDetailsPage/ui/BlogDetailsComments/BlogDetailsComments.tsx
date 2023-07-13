import { Separator } from '@/shared/ui/Separator/Separator';
import { CommentsList } from '@/entities/Comment';
import { CreateCommentForm } from '@/features/CreateComment';

interface BlogDetailsCommentsProps {
  postId: string,
}

export const BlogDetailsComments = (props: BlogDetailsCommentsProps) => {
  const { postId } = props;

  return (
    <div className='flex flex-col gap-y-4 mt-4'>
      <Separator className='w-full h-px my-6' />

      <CreateCommentForm postId={postId} />

      <CommentsList postId={postId} />
    </div>
  )
}