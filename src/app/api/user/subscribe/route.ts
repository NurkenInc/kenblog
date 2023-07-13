import { db } from '@/shared/libs/utils/db';
import { getAuthSession } from '@/shared/libs/configs/session/session';
import z from 'zod';
import { SubscriptionValidator } from '@/entities/Subscriptions/model/subscriptions';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { userInViewId } = SubscriptionValidator.parse(body);

    if (!userInViewId) {
      throw new Error('User in view id was not provided');
    }

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userInView = await db.user.findUnique({
      where: {
        id: userInViewId,
      },
      include: {
        subscriptions: true,
      }
    })

    const isSubscribed = userInView?.subscriptions.find(sub => sub.userId === session.user.id);

    if (isSubscribed) {
      await db.user.update({
        where: {
          id: userInViewId
        },
        data: {
          subscriptions: {
            set: userInView?.subscriptions.filter(sub => sub.userId !== session.user.id)
          }
        }
      })

      return new Response('OK');
    }

    const newSubscribers = userInView?.subscriptions ? 
    [...userInView?.subscriptions, { userId: session.user.id }] :
    [{ userId: session.user.id }];

    console.log(newSubscribers);
    await db.user.update({
      where: {
        id: userInViewId
      },
      data: {
        subscriptions: {
          set: newSubscribers,
        },
      }
    })

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    
    return new Response('Could not register your subscription. Please try again', { status: 500 })
  }
}