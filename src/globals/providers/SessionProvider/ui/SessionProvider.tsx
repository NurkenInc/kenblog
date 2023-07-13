'use client'

import { ReactNode } from 'react';
import { SessionProvider as NSessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface SessionProviderProps {
  children: ReactNode,
  session?: Session,
}

export const SessionProvider = ({ children, session }: SessionProviderProps) => {
  return (
    <NSessionProvider session={session}>
      {children}
    </NSessionProvider>
  )
}