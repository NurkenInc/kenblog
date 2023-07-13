import { z } from 'zod'
import { Content, Details } from '@/entities/Post'
import { Post } from '@prisma/client'

// export interface CreatePostFormSchema {
//   content: Content,
//   details: Details,
//   currentStep: number,
//   uniqueError?: string,
// }

export const createPostFormSchema = z.object({
  title: z.string(),
  content: z.any(),
  category: z.string(),
  thumbnail: z.string().optional(),
  tags: z.object({ 
    tag: z.string(), 
  }).array().optional(),
  currentStep: z.number(),
  uniqueError: z.string().optional(),
})

export type CreatePostFormRequest = z.infer<typeof createPostFormSchema>;