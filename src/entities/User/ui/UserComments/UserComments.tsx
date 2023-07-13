import { UserAvatar } from '../UserAvatar/UserAvatar'
import { formatTimeToNow } from '@/shared/libs/utils/date'
import { buttonVariants } from '@/shared/ui/Button/button'
import Link from 'next/link'
import { Comment, User } from '@prisma/client'

interface UserCommentsProps {
  comments: (Comment & {
    author: User
  })[]
}

export const UserComments = (props: UserCommentsProps) => {
  const { comments } = props;
  
  const commentsList = comments.map((comment) => (
    <div className='flex flex-col' key={comment.id}>
      <div className='flex items-center'>
        <UserAvatar
          src={comment.author.image}
          fallback={comment.author.username}
          className='h-6 w-6'
        />

        <div className='ml-2 flex items-center gap-x-2'>
          <p className='text-sm font-medium text-gray-900'>
            {comment.author.username}
          </p>
          <p className='max-h-40 truncate text-xs text-zinc-500'>
            {formatTimeToNow(comment.createdAt)}
          </p>
          <p className='text-sm font-medium text-gray-900'>
            {comment.author.username}
          </p>
          <p className='max-h-40 truncate text-xs text-zinc-500'>
            Replied to {comment.author.name} post
          </p>
        </div>
      </div>

      <p className='text-sm text-zinc-900 mt-2'>
        {comment.text}
      </p>

      <div className='flex gap-4 items-center flex-wrap'>
        <Link className={buttonVariants()} href={`/feed/post/${comment.postId}`}>
          Check out post
        </Link>
      </div>
    </div>
  ))

  return commentsList
}