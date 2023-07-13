// todo: place in model

import { User } from '@prisma/client';
import { api } from '../../api';

export const getSubscriptions = async (user?: User, onError?: () => void) => {
  if (!user) return [];
  
  try {
    const { data } = await api.get('/api/users/subscription');
    return data;
  } catch (error) {
    onError?.();
    return null;
  }
}