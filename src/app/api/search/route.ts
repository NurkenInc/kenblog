import { db } from '@/shared/libs/utils/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');

  if (!q) return new Response('Invalid query', { status: 400 });

  const results = await db.post.findMany({
    where: {
      title: {
        contains: q,
      },
    },
    include: {
      _count: true,
    },
    take: 5,
  })

  return new Response(JSON.stringify(results));
}