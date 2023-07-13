import { db } from '@/shared/libs/utils/db';
import { PostVoteValidator } from '@/features/PostVote/model/validator/votes';
import { getAuthSession } from '@/shared/libs/configs/session/session';
import { CachedPost } from '@/shared/libs/types/redis/redis';
import { redis } from '@/shared/libs/utils/redis';
import z from 'zod';

const CACHE_AFTER_UPVOTES = 1;

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, voteType } = PostVoteValidator.parse(body);

    const session  = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      }
    })

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      }
    })

    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_postId: {
              postId,
              userId: session.user.id,
            }
          }
        })

        return new Response('OK');
      }

      await db.vote.update({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          }
        },
        data: {
          type: voteType,
        }
      })

      // recount the votes
      const votesAmount = post.votes.length;

      if (votesAmount >= CACHE_AFTER_UPVOTES) {
        const cachePayload: CachedPost = {
          authorUsername: post.author.username ?? '',
          content:JSON.stringify(post.content),
          id:  post.id,
          title: post.title,
          currentVote: voteType,
          createdAt: post.createdAt
        }

        await redis.hset(`post:${postId}`, cachePayload);
      }

      return new Response('OK');
    }

    await db.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        postId: post.id,
      }
    })

    const votesAmount = post.votes.length;

    if (votesAmount >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedPost = {
        authorUsername: post.author.username ?? '',
        content:JSON.stringify(post.content),
        id:  post.id,
        title: post.title,
        currentVote: voteType,
        createdAt: post.createdAt
      }

      await redis.hset(`post:${postId}`, cachePayload);
    }

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not register your vote. Please try again', { status: 500 })
  }
}