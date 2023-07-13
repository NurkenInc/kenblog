import { getAuthSession } from '@/shared/libs/configs/session/session';
import { db } from '@/shared/libs/utils/db';
import { CommentsListItem } from '../CommentsListItem/CommentsListItem';

interface CommentsListProps {
  postId: string,
}

export const CommentsList = async (props: CommentsListProps) => {
  const { postId } = props;
  
  const session = await getAuthSession();

  const comments = await db.comment.findMany({
    where: {
      postId,
      replyToId: null
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        }
      },
    }
  })

  return (
    <div className='flex flex-col gap-y-6 mt-4'>
      {comments.filter(comment => !comment.replyToId).map(topLevelComment => {
        return (
          <div className='flex flex-col' key={topLevelComment.id}>
            <div className='mb-2'>
              <CommentsListItem 
                comment={topLevelComment}
                userId={session?.user.id}
                postId={postId}
              />
            </div>

            {topLevelComment.replies.sort((a, b) => b.votes.length - a.votes.length).map(reply => (
              <div
                key={reply.id}
                className='ml-2 py-2 pl-4 border-l-2 border-zinc-200'
              >
                <CommentsListItem 
                  comment={reply}
                  userId={session?.user.id}
                  postId={postId}
                />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}