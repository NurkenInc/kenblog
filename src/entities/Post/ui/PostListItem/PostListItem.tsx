'use client';

import { useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card/card";
import { formatTimeToNow } from '@/shared/libs/utils/date';
import { Button, buttonVariants } from '@/shared/ui/Button/button';
import { MessageCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PostVoteButtonClient } from '@/features/PostVote/ui/PostVoteButton/PostVoteButtonClient/PostVoteButtonClient';
import { ExtendedPost } from '@/shared/libs/types/db/db';
import { EditorOutput } from '@/features/Editor';
import { UserAvatar, UserHoverCard } from '@/entities/User';

interface PostListItemProps {
  post: ExtendedPost,
  userId?: string,
}

export const PostListItem = (props: PostListItemProps) => {
  const {
    post,
    userId,
  } = props;

  const pRef = useRef<HTMLDivElement>(null);

  const likes = post.votes.filter(vote => vote.type === 'UP').length;
  const dislikes = post.votes.filter(vote => vote.type === 'DOWN').length;

  const currentVote = post.votes.find(vote => vote.userId === userId);

  return (
    // responsviness, grid?, react device detect?
    <Card className='max-h-[600px] px-4 w-full my-4 overflow-hidden'>
      <div className='flex'>
        <div className='break-words whitespace-normal truncate'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <UserHoverCard
                trigger={(
                  <div>
                    <UserAvatar
                      src={post.author.image}
                      fallback={post.author.username}
                    />
                  </div>
                )}
                userId={post.authorId}
                username={post.author.username || ''}
                description={post.author.description}
                image={post.author.image}
              />
              <div>
                <div className='flex items-center gap-1'>
                  <CardTitle>{post.author.username}</CardTitle>
                  {post.publishedAt && (
                    <>
                      {' '}
                      <p>{formatTimeToNow(post.publishedAt)}</p>
                    </>
                  )}
                </div>
                <CardDescription>{post.author?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <section className='flex flex-row items-start justify-between mb-2'>
              {/* {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '50%', borderRadius: '15px', objectFit: 'cover' }}
                />
              )} */}
              <div>
                <h4 className="scroll-m-20 text-[14px] lg:text-xl font-semibold tracking-tight break-words whitespace-normal">
                  {post.title}
                </h4>
                <div className='relative text-sm max-h-16 w-full overflow-clip' ref={pRef}>
                  <EditorOutput content={post.content} />
                  {pRef.current?.clientHeight === 160 ? (
                    <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
                  ) : null}
                </div>
              </div>
            </section>
            <Link href={`/feed/post/${post.id}`} className={buttonVariants()}>
              Read
            </Link>
          </CardContent>
        </div>
      </div>
      <CardFooter className='flex flex-wrap w-full'>
        {/* {post.tags?.[0] && post.tags.map(tag => (
          <Button key={tag} variant={"outline"} className="rounded-full text-[11px] md:text-[14px]">
            {tag}
          </Button>
        ))} */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <PostVoteButtonClient
              initialDislikes={dislikes}
              initialVote={currentVote?.type}
              initialLikes={likes}
              postId={post.id}
              disabled={!userId}
            />
            <Button variant="ghost" className='ml-4'>
              <MessageCircle color="#000000" strokeWidth={1.25} />
              <span>
              {post.comments?.length ?? 0}
              </span>
            </Button>
          </div>
          <Button variant="ghost">
            <Eye color="#000000" strokeWidth={1.25} />
            {/* <span>
              {0}
            </span> */}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}