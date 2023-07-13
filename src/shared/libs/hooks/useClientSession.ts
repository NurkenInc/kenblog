'use client';

import { useSession } from 'next-auth/react';
import { ISession } from '../configs/session/types';

export function useClientSession() {
  const { data } = useSession();

  const session = data as ISession;

  return { session, user: session?.user }
}