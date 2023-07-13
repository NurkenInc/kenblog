import { Post, Vote, VoteType } from '@prisma/client';
import { notFound } from 'next/navigation';
import { PostVoteButtonClient } from '../PostVoteButtonClient/PostVoteButtonClient';
import { getAuthSession } from '@/shared/libs/configs/session/session';
import { getServerSession } from 'next-auth';

interface PostVoteButtonProps {
  postId: string
  initialLikes?: number
  initialDislikes?: number
  initialVote?: VoteType | null
  getData?: () => Promise<(Post & {votes: Vote[]}) | null>
  disabled?: boolean
}

// todo: vote it's a separate entity and button should be in that enityty ad should be totally reusable
export const PostVoteButtonServer = async (props: PostVoteButtonProps) => {
  const { 
    postId, 
    initialLikes = 0, 
    initialDislikes = 0, 
    initialVote, 
    getData,
    disabled,
  } = props;

  const session = await getAuthSession();

  let _likesAmount: number = 0;
  let _dislikesAmount: number = 0;
  let _currentVote: VoteType | null | undefined = undefined;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();

    _likesAmount = post.votes.filter(vote => vote.type === 'UP').length;
    _dislikesAmount = post.votes.filter(vote => vote.type === 'DOWN').length;

    _currentVote = post.votes.find(vote => vote.userId === session?.user.id)?.type;
  } else {
    _likesAmount = initialLikes;
    _dislikesAmount = initialDislikes;

    _currentVote = initialVote;
  }

  return (
    <PostVoteButtonClient 
      disabled={!!disabled}
      postId={postId}
      initialLikes={_likesAmount}
      initialDislikes={_dislikesAmount}
      initialVote={_currentVote}
    />
  )
}