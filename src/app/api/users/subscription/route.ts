import z from 'zod';
import { db } from '@/shared/libs/utils/db';
import { getAuthSession } from '@/shared/libs/configs/session/session';

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const followedPeoples = await db.subscription.findMany({
      where: {
        userId: session?.user.id
      },
      include: {
        user: true,
      },
    })

    return new Response(JSON.stringify(followedPeoples));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not fetch subscriptions', { status: 500 })
  }
}