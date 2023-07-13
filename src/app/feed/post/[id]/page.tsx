import { BlogDetailsPage } from '@/layouts/BlogDetailsPage/ui/BlogDetailsPage/BlogDetailsPage';
import { redis } from '@/shared/libs/utils/redis';
import { CachedPost } from '@/shared/libs/types/redis/redis';
import { Post, User, Vote } from '@prisma/client';
import { db } from '@/shared/libs/utils/db';
import { notFound } from 'next/navigation';

type Params = {
  id: string,
}

interface PostDetailsProps {
  params: Params,
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Post Details',
  description: 'Post details are great way to explore more!',
}

export default async function PostDetails (props: PostDetailsProps) {
  const { params: { id: postId } } = props;
 
  const cachedPost = await redis.hgetall(`post:${postId}`) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        votes: true,
        author: true,
      }
    })
  }

  if (!post && !cachedPost) return notFound();

  return (
    <main className="w-full p-5 flex grow shrink-0">
      <BlogDetailsPage 
        post={post} 
        cachedPost={cachedPost}
        postId={postId}
      />
    </main>
  )
}