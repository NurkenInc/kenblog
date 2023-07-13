import { z } from 'zod';
import { detailsFormSchema } from './details.schema';
import { contentFormSchema } from './content.schema';

export const PreviewValidator = detailsFormSchema
  .merge(contentFormSchema)
  .omit({ tags: true })
  .extend({ 
    tags: z.array(z.string()).optional(), 
    content: z.any()
  });

export type PostType = z.infer<typeof PreviewValidator>;