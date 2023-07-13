import { db } from '@/shared/libs/utils/db';
import { UserDetails, UserComments } from '@/entities/User';
import { getQueryClient } from '@/shared/libs/utils/query';
import { dehydrate } from '@tanstack/react-query';
import { getUserDetails } from '@/shared/api/actions/users';
import { Hydrate } from '@/shared/libs/components/Hydrate/Hydrate';

interface UserCommentsPageProps {
  userId: string
}

export const UserCommentsPage = async (props: UserCommentsPageProps) => {
  const { userId } = props;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['user-details-query'], () => getUserDetails({userId, postsIncluded: true}))
  const dehydratedState = dehydrate(queryClient);
  
  const comments = await db.comment.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
    }
  })

  return (
    <Hydrate state={dehydratedState}>
      <div className='max-w-2xl p-4'>
        <UserDetails userId={userId} />
        <UserComments comments={comments} />
      </div>
    </Hydrate>
  )
}