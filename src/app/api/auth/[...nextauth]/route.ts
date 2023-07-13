import NextAuth from 'next-auth/next';

import { authOptions } from '@/shared/libs/configs/session/session';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
