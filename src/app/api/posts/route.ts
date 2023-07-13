import z from 'zod';
import { db } from '@/shared/libs/utils/db';
import { getAuthSession } from '@/shared/libs/configs/session/session';

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  let followedPeopleIds: string[] = [];

  if (session) {
    const followedPeoples = await db.subscription.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        user: true,
      }
    })

    followedPeopleIds = followedPeoples.map(({ userId }) => userId)
  }

  try {
    const { limit, page, userId } = z.object({
      limit: z.string(),
      page: z.string(),
      userId: z.string().nullish().optional(),
    }).parse({
      userId: url.searchParams.get('userId'),
      limit: url.searchParams.get('limit'),
      page: url.searchParams.get('page'),
    })

    let whereClause = {}

    if (userId) {
      whereClause = {
        authorId: userId
      }
    } else if (session && followedPeopleIds.length) {
      whereClause = {
        authorId: { in: followedPeopleIds }
      }
    } else {
      whereClause = {
        authorId: { not: undefined }
      }
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        author: true,
        comments: true,
        votes: true,
      },
      where: whereClause
    })

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not fetch more posts', { status: 500 })
  }
}