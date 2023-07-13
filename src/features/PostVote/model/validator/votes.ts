import { z } from 'zod';

// todo: vote it's a separate entity and button should be in that enityty ad should be totally reusable
export const PostVoteValidator = z.object({
  postId: z.string(),
  voteType: z.enum(['UP', 'DOWN']),
})

export type PostVoteRequest = z.infer<typeof PostVoteValidator>;
