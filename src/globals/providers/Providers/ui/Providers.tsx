import { ReactNode } from 'react'
import { SessionProvider } from '../../SessionProvider'
import { QueryProvider } from '../../QueryProvider'
import { Session } from 'next-auth'

interface ProvidersProps {
  children: ReactNode,
  session?: Session,
}

export const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </SessionProvider>
  )
}