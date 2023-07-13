import { db } from '@/shared/libs/utils/db';
import { Suspense } from 'react';
import { Post, Vote, User } from '@prisma/client';
import Image from 'next/image';
import { Button } from '@/shared/ui/Button/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/Avatar/avatar';
import { formatTimeToNow } from '@/shared/libs/utils/date';
import { EditorOutput } from '@/features/Editor';
import { PostVoteButtonServer } from '@/features/PostVote/ui/PostVoteButton/PostVoteButtonServer/PostVoteButtonServer';
import { PostVoteShell } from '@/features/PostVote';
import { CachedPost } from '@/shared/libs/types/redis/redis';

interface PostDetailsProps {
  post?: (Post & { votes: Vote[]; author: User }) | null,
  cachedPost: CachedPost,
  postId: string,
}

export const PostDetails = (props: PostDetailsProps) => {
  const { post, cachedPost, postId } = props;

  const getData = async () => {
    return await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        votes: true,
      }
    })
  }

  return (
    <section className='px-4 w-full my-4 overflow-hidden'>
      <div className='w-full break-words whitespace-normal truncate'>
        <header className='flex items-center gap-2 mt-2'>
          <Avatar>
            <AvatarImage src={post?.author?.image || ''} />
            <AvatarFallback>{post?.author.name ?? cachedPost.authorUsername}</AvatarFallback>
          </Avatar>
          <div className='flex items-center gap-1'>
            <div>{post?.author.name ?? cachedPost.authorUsername}</div>
            {post?.createdAt && (
              <>
                {' '}
                <p>{formatTimeToNow(post?.createdAt ?? cachedPost.createdAt)}</p>
              </>
            )}
          </div>
          <div>{post?.author?.email}</div>
        </header>
      </div>
      <div className='w-full flex self-stretch items-center'>
        {post?.thumbnail && (
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', maxHeight: '200px', borderRadius: '15px', objectFit: 'contain' }}
          />
        )}
      </div>
      <div>
        <section className='flex flex-row items-start justify-between mb-2 w-full'>
          <div>
            <h4 className="scroll-m-20 text-[19px] lg:text-xl font-semibold tracking-tight break-words whitespace-normal">
              {post?.title ?? cachedPost.title}
            </h4>
            <EditorOutput content={post?.content ?? cachedPost.content} />
          </div>
        </section>
      </div>
      <footer className='flex flex-wrap w-full'>
        <Suspense fallback={<PostVoteShell />}>
          <PostVoteButtonServer postId={post?.id ?? cachedPost?.id} getData={getData} />
        </Suspense>
        {/* {post.tags?.[0] && post.tags.map(tag => (
          <Button key={tag} variant={"outline"} className="rounded-full text-[11px] md:text-[14px]">
            {tag}
          </Button>
        ))} */}
      </footer>
    </section>
  )
}