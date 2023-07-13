import { Post } from '@/entities/Post';
import { EntityState } from '@reduxjs/toolkit';

export interface BlogsSchema extends EntityState<Post> {
  isLoading: false,
  error?: string,
  
  // filters
  title: string,
  content: any
  category: string,
  tag: string,

  
}