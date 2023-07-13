import { getAuthSession } from '@/shared/libs/configs/session/session';
import { PreviewValidator } from '@/features/CreatePost';
import { db } from '@/shared/libs/utils/db';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json();
    const {
      category,
      content,
      tags = [],
      title,
      thumbnail = '',
    } = PreviewValidator.parse(body)
    
    const tagsFinal = tags.join(',');

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        category,
        thumbnail,
        tags: tagsFinal,
      }
    })

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not create post', { status: 500 })
  }
}