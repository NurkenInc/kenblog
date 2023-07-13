import { z } from 'zod';

// todo: vote it's a separate entity and button should be in that enityty ad should be totally reusable
export const CommentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum(['UP', 'DOWN']),
})

export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>;
