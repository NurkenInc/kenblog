// import { db } from '@/shared/libs/utils/db'
import { PostsList } from '@/entities/Post'
// import { INFINITE_SCROLLING_PAGINATION_LIMIT } from '@/shared/libs/consts/infiniteScroll'
import { ExtendedUser } from '@/shared/libs/types/db/db'
import { getPosts } from '@/shared/api/actions/posts'
import { getQueryClient } from '@/shared/libs/utils/query'
import { dehydrate } from '@tanstack/react-query'
import { Hydrate } from '@/shared/libs/components/Hydrate/Hydrate'

interface CustomFeed {
  user?: ExtendedUser | null,
}

export const CustomFeed = async (props: CustomFeed) => {
  const { user } = props;
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(['infinite-posts-query'], () => getPosts(1))
  const dehydratedState = dehydrate(queryClient)
  // blogs page??

  // const followedPeoples = await db.subscription.findMany({
  //   where: {
  //     userId: user?.id
  //   },
  //   include: {
  //     user: true,
  //   },
  // })

  // const posts = await db.post.findMany({
  //   where: {
  //     authorId: {
  //       in: followedPeoples.map(people => people.userId)
  //     }
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   },
  //   include: {
  //     votes: true,
  //     comments: true,
  //     author: true,
  //   },
  //   take: INFINITE_SCROLLING_PAGINATION_LIMIT,
  // })

  return (
    <Hydrate state={dehydratedState}>
      <PostsList userId={user?.id} />
    </Hydrate>
  )
}
