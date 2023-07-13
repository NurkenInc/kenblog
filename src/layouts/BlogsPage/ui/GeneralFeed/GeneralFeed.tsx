import { PostsList } from '@/entities/Post'
import { Hydrate } from '@tanstack/react-query'
import { getPosts } from '@/shared/api/actions/posts'
import { getQueryClient } from '@/shared/libs/utils/query'
import { dehydrate } from '@tanstack/react-query'

export const GeneralFeed = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(['infinite-posts-query'], () => getPosts(1))
  const dehydratedState = dehydrate(queryClient)

  // if (!posts) return <PostSkeletonsList /> // in posts list

  return (
    <Hydrate state={dehydratedState}>
      <PostsList />
    </Hydrate>
  )
}
