import { z } from 'zod';
import { db } from '@/shared/libs/utils/db';
import { CommentValidator } from '@/features/CreateComment/model/validators/comment';
import { getAuthSession } from '@/shared/libs/configs/session/session';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, text, replyToId } = CommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      }
    })

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not create comment', { status: 500 })
  }
}