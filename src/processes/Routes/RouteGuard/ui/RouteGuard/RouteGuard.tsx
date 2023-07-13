import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/shared/libs/configs/session/session';

interface RouteGuardProps {
  children: ReactNode,
  callbackUrl?: string,
}

export const RouteGuard = async (props: RouteGuardProps) => {
  const {
    children,
    callbackUrl
  } = props;

  const session = await getAuthSession();
  
  if (!session) redirect(authOptions.pages?.signIn || '/auth');

  return (
    <>
      {children}
    </>
  )
}