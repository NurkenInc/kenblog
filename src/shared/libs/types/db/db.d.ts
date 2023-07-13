import { Comment, Post, User, Vote, CommentVote, Subscription } from '@prisma/client';

export type ExtendedPost = Post & {
  votes: Vote[],
  author: User,
  comments: Comment[]
}

export type ExtendedComment = Comment & {
  votes: CommentVote[],
  author: User,
}

export type ExtendedUser = User & {
  id: string,
  posts?: Post[] | null,
  comments?: Comment[] | null,
  // subscribers of user
  subscriptions?: Subscription[] | null,
}
