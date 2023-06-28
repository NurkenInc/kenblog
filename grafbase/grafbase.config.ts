import { g, auth, config } from '@grafbase/sdk';

// @ts-ignore
const Post = g.model('Post', {
  title: g.string(),
  slug: g.string().unique(),
  content: g.string().optional(),
  publishedAt: g.datetime().optional(),
  comments: g.relation(() => Comment).optional().list().optional(),
  likes: g.int().default(0),
  category: g.string().search(),
  tags: g.string().optional().list().length({ max: 10 }),
  author: g.relation(() => User).optional(),
  // @ts-ignore
}).search().auth((rules) => {
  rules.public().read(),
  rules.private().create().delete().update()
});

const Comment = g.model('Comment', {
  post: g.relation(Post),
  body: g.string(),
  likes: g.int().default(0),
  author: g.relation(() => User).optional(),
});

// @ts-ignore
const User = g.model('User', {
  name: g.string(),
  email: g.string().unique(),
  posts: g.relation(Post).list().optional(),
  description: g.string().optional(),
  linkedInUrl: g.url().optional(),
  avatarUrl: g.url(),
  role: g.string().optional(),
  comments: g.relation(Comment).list().optional(),
  // @ts-ignore
}).auth((rules) => {
  rules.public().read()
});

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    // @ts-ignore
    rules: (rules) => rules.private(),
  }
});
