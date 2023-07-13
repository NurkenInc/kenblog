import { Session, User } from 'next-auth';
import { Post } from '@/entities/Post';

export interface ISession extends Session {
  user: User & {
    id: string,
    name: string,
    username: string,
    email: string,
    image: string,
  }
}

export interface UserProfile {
  id: string,
  name: string,
  username: string,
  email: string,
  description: string | null,
  image: string,
  linkedInUrl: string | null,
}
