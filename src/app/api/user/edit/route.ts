import { z } from 'zod';
import { db } from '@/shared/libs/utils/db';
import { editUserFormSchema } from '@/features/EditUser/model/validator/editUser';
import { getAuthSession } from '@/shared/libs/configs/session/session';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json();

    const { name, description, githubUrl, linkedInUrl, telegramUrl } = editUserFormSchema.parse(body);

    const user = await db.user.findFirst({
      where: {
        username: name,
      }
    })

    if (user) {
      return new Response('Username is taken', { status: 409 })
    }

    await db.user.update({
      where: {
        id: session.user.id
      },
      data: {
        username: name,
        description,
        githubUrl,
        linkedInUrl,
        telegramUrl,
      }
    })

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not update user, please try again later', { status: 500 })
  }
}