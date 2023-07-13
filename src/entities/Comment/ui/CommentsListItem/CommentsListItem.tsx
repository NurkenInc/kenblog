'use client';

import { ExtendedComment } from '@/shared/libs/types/db/db';
import { useRef, useState } from 'react';
import { UserAvatar } from '@/entities/User';
import { formatTimeToNow } from '@/shared/libs/utils/date';
import { CommentVoteButton } from '@/features/CommentVote/ui/CommentVoteButton/CommentVoteButton';
import { Button } from '@/shared/ui/Button/button';
import { MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CreateCommentForm } from '@/features/CreateComment';

interface CommentsListItemProps {
  comment: ExtendedComment,
  postId: string,
  userId?: string,
}

export const CommentsListItem = (props: CommentsListItemProps) => {
  const {
    comment,
    userId,
    postId
  } = props;
  const router = useRouter();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const { data: session } = useSession();

  const likesAmount = comment.votes.filter(vote => vote.type === 'UP').length;
  const dislikesAmount = comment.votes.filter(vote => vote.type === 'DOWN').length;

  const currentVote = comment.votes.find(vote => vote.userId === userId);

  const onReply = () => {
    if (!session) router.push('/auth');
    else setIsReplying(true);
  }

  const onCancel = () => {
    setIsReplying(false);
  }

  return (
    <div className='flex flex-col'>
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
        </div>
      </div>

      <p className='text-sm text-zinc-900 mt-2'>
        {comment.text}
      </p>

      <div className='flex gap-4 items-center flex-wrap'>
        <CommentVoteButton
          initialDislikes={dislikesAmount}
          initialLikes={likesAmount}
          commentId={comment.id}
          initialVote={currentVote?.type}
        />

        <Button onClick={onReply} className='ml-6' variant="ghost" size='sm'>
          <MessageSquare className='h-5 w-5 mr-1.5 text-zinc-700' />
          Reply
        </Button>

        {isReplying ? (
          <CreateCommentForm
            autoFocus
            postId={postId} 
            replyToId={comment.replyToId ?? comment.id}
            comment={comment}
            onCancel={onCancel} 
          />
        ) : null}
      </div>
    </div>
  )
}