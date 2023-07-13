import { Suspense } from 'react';
import { Post, Vote, User } from '@prisma/client';
import { PostDetails } from '@/entities/Post';
import { CachedPost } from '@/shared/libs/types/redis/redis';
import { Loader2 } from 'lucide-react';
import { BlogDetailsComments } from '../BlogDetailsComments/BlogDetailsComments';

interface BlogDetailsPageProps {
  post?: (Post & { votes: Vote[]; author: User }) | null,
  cachedPost: CachedPost,
  postId: string,
}

export const BlogDetailsPage = (props: BlogDetailsPageProps) => {
  const { post, cachedPost, postId } = props;
  
  return (
    <div className='w-full'>
      <PostDetails 
        post={post} 
        cachedPost={cachedPost} 
        postId={postId}
      />
      <Suspense fallback={<Loader2 className='h-5 w-5 animate-spin text-zinc-500' />}>
        <BlogDetailsComments postId={postId} />
      </Suspense>
    </div>
  )
}