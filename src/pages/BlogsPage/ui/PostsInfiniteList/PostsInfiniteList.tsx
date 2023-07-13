import { SearchParams } from '@/shared/libs/types/search/search';
import { PostsList } from '@/entities/Post';
import { ExtendedPost } from '@/shared/libs/types/db/db';

interface PostsInfiniteListProps {
  initialPosts: ExtendedPost[]
}

export const PostsInfiniteList = async (props: PostsInfiniteListProps) => {
  const { initialPosts } = props;
  // const data = await fetchAllPosts<PostSearch>(searchParams?.query, searchParams?.endcursor);

  // const postsToDisplay = data?.postSearch?.edges || [];

  // if (postsToDisplay.length === 0) {
  //   return (
  //     <section>
  //       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  //         Posts are not found
  //       </h1>
  //     </section>
  //   )
  // }

  return (
    <div>
      <PostsList initialPosts={initialPosts} />
      {/* <Pagination 
        // totalPages={4} 
        startCursor={data.postSearch.pageInfo?.startCursor} 
        endCursor={data.postSearch.pageInfo?.endCursor} 
        hasPreviousPage={data.postSearch.pageInfo?.hasPreviousPage} 
        hasNextPage={data.postSearch.pageInfo?.hasNextPage}
      /> */}
    </div>
  )
}