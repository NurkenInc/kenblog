import { getAuthSession } from '@/shared/libs/configs/session/session';
import { getQueryClient } from '@/shared/libs/utils/query';
import { dehydrate } from '@tanstack/react-query';
import { Hydrate } from '@/shared/libs/components/Hydrate/Hydrate';
import { UserSubscriptions } from '@/entities/User';
import { getSubscriptions } from '@/shared/api/actions/subscriptions';
import { Sidebar } from '@/widgets/Sidebar';

export const BlogsSidebar = async () => {
  const session = await getAuthSession();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['subscriptions-query'], () => getSubscriptions(session?.user))
  const dehydratedState = dehydrate(queryClient);

  return (
    <Sidebar 
      content={(
        <Hydrate state={dehydratedState}>
          <UserSubscriptions user={session?.user} />
        </Hydrate>
      )}
    />
  )
}