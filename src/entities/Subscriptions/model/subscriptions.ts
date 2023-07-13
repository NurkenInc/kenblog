import { z } from 'zod';

export const SubscriptionValidator = z.object({
  userInViewId: z.string().optional(),
})

export type SubscriptionRequest = z.infer<typeof SubscriptionValidator>;
