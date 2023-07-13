import { db } from '@/shared/libs/utils/db';
import { z } from 'zod';

type Params = {
  id: string
}

export async function GET(req: Request, { params }: { params: Params }) {
  const id = params.id;
  const url = new URL(req.url);

  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
      include: {
        subscriptions: true,
      }
    })

    if (!!url.searchParams.get('postsIncluded')) {
      const posts = await db.post.findMany({
        where: {
          authorId: id,
        }
      })

      console.log('fetched');

      return new Response(JSON.stringify({
        ...user,
        posts
      }));
    }

    if (!!url.searchParams.get('commentsIncluded')) {
      const comments = await db.post.findMany({
        where: {
          authorId: id,
        }
      })

      return new Response(JSON.stringify({
        ...user,
        comments
      }));
    }

    return new Response(JSON.stringify(user));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not get user details, please try again later', { status: 500 })
  }
}