// todo: place in model

import { ExtendedUser } from '@/shared/libs/types/db/db';
import { api } from '../../api';

interface getUserDetailsProps {
  userId: string
  postsIncluded?: boolean
  commentsIncluded?: boolean
  onError?: () => void
}

export const getUserDetails = async (props: getUserDetailsProps): Promise<ExtendedUser | null> => {
  const {
    userId,
    postsIncluded,
    commentsIncluded,
    onError,
  } = props;

  if (!userId) return null;
  
  try {
    const { data } = await api.get(`/api/user/details/${userId}?postsIncluded=${postsIncluded}&commentsIncluded=${commentsIncluded}`);
    return data;
  } catch (error) {
    onError?.();
    return null;
  }
}