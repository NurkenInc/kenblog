import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import { ExtendedUser } from '../db/db'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    username?: string | null
  }
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser,
  }
}