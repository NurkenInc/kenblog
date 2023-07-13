'use client';

import { useEffect } from 'react';
import { useRef } from 'react';
import { PostListItem } from '../PostListItem/PostListItem';
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query';
import { INFINITE_SCROLLING_PAGINATION_LIMIT } from '@/shared/libs/consts/infiniteScroll';
import { PostSkeletonsList } from '../PostSkeletonsList/PostSkeletonsList';
import { getPosts } from '@/shared/api/actions/posts';

interface PostsListProps {
  isLoading?: boolean,
  error?: string | null,
  userId?: string,
}

export const PostsList = (props: PostsListProps) => {
  const { userId } = props;

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  });
  
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['infinite-posts-query'],
    ({ pageParam = 1 }) => getPosts(pageParam, userId),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.length === INFINITE_SCROLLING_PAGINATION_LIMIT ? pages.length + 1 : undefined;
      },
      initialData: { pages: [], pageParams: [1] }
    },
  )

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage])
  
  const posts = data?.pages.flatMap((page) => page) ?? []

  return (
    <div>
      <section>
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div ref={ref} key={post!.id}>
                <PostListItem post={post!} userId={userId} />
              </div>
            )
          }
          return (
            <div key={post!.id}>
              <PostListItem post={post!} userId={userId} />
            </div>
          )
        })}

        {!posts.length && (
          <PostSkeletonsList />
        )}
      </section>
    </div>
  )
}