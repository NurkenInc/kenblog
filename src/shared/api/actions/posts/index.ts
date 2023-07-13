// todo: place in model

import { INFINITE_SCROLLING_PAGINATION_LIMIT } from '@/shared/libs/consts/infiniteScroll';
import { ExtendedUser, ExtendedPost } from '@/shared/libs/types/db/db';
import { api } from '../../api';

export const getPosts = async (pageParam: number, userId?: string | null, onError?: () => void) => {
  const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_LIMIT}&page=${pageParam}`
  + (!!userId ? `&userId=${userId}` : '');

  try {
    const { data } = await api.get(query)
    return data as ExtendedPost[];
  } catch (error) {
    onError?.();
  }
}