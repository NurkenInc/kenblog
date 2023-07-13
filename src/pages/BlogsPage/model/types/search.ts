import { Post } from '@/entities/Post';

export type PostSearch = {
  postSearch: {
    edges: { node: Post }[],
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    }
  }
}

type SearchParams = {
  
}
