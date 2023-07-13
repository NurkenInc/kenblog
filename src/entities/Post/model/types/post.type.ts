export interface Content {
  title: string,
  thumbnail: string,
  content: any,
  category: string,
}

export interface Tag {
  tag: string
}

export interface Details {
  tags: Tag[],
}

export interface Author {
  id: string,
  name: string,
  email?: string,
  description?: string,
  avatarUrl?: string,
}

export interface Post {
  id?: string,
  title: string,
  content: any,
  category: string,
  thumbnail?: string,
  tags?: string[],
  publishedAt: Date,
  author: Author,
  likes: string[],
  views: string[],
  comments: Author[],
}