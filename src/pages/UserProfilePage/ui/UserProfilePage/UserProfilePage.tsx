import { UserDetails } from '@/entities/User'
import { PostsList } from '@/entities/Post';
import { getUserDetails } from '@/shared/api/actions/users';
import { Hydrate } from '@/shared/libs/components/Hydrate/Hydrate';
import { getQueryClient } from '@/shared/libs/utils/query';
import { dehydrate } from '@tanstack/react-query';
import { getPosts } from '@/shared/api/actions/posts';

interface UserDetailsPageProps {
  userId: string
}

export const UserProfilePage = async (props: UserDetailsPageProps) => {
  const { userId } = props;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['user-details-query'], () => getUserDetails({userId, postsIncluded: true}))
  await queryClient.prefetchInfiniteQuery(['infinite-posts-query'], () => getPosts(1, userId))
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className='max-w-2xl p-4'>
        <UserDetails userId={userId} />

        <PostsList userId={userId} />
      </div>
    </Hydrate>
  )
}