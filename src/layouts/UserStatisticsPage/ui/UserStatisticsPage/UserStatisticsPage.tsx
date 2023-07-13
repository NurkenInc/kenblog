import { UserDetails, UserStatistics } from '@/entities/User'
import { getUserDetails } from '@/shared/api/actions/users';
import { Hydrate } from '@/shared/libs/components/Hydrate/Hydrate';
import { getQueryClient } from '@/shared/libs/utils/query';
import { dehydrate } from '@tanstack/react-query';

interface UserDetailsPageProps {
  userId: string
}

export const UserStatisticsPage = async (props: UserDetailsPageProps) => {
  const { userId } = props;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['user-details-query'], () => getUserDetails({userId, postsIncluded: true}))
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className='max-w-2xl p-4'>
        <UserDetails userId={userId} />

        <UserStatistics userId={userId} />
      </div>
    </Hydrate>
  )
}