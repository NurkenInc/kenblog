import * as z from "zod"
import { ContentFields } from '../types/content.type'

export const contentFormSchema = z.object({
  title: z.string().min(2, {
    message: "Please enter at least 2 characters for title.",
  }).max(200, {
    message: "Maximum characters limit is 200 for title",
  }),
  category: z.string().min(2, {
    message: "Please enter at least 2 characters for category.",
  }).max(30, {
    message: "Maximum characters limit is 30",
  }),
  thumbnail: z.string().url({
    message: "Please provide valid thumbnail url",
  }).optional().or(z.literal('')),
  content: z.any(),
})

// selectors???
export const formFields: ContentFields = [
  {
    name: 'title',
    label: 'Post title',
    placeholder: 'Some title',
    inputType: 'textarea',
  },
  {
    name: 'category',
    label: 'Post category',
    placeholder: 'Business, Economy, Food',
    inputType: 'input',
  },
  {
    name: 'thumbnail',
    label: 'Post thumbnail(optional)',
    inputType: 'file',
  },
  {
    name: 'content',
    label: 'Post content',
    placeholder: 'I love chocolate, subscribe, like thanks, #chocolate #icecream',
    description: 'Write post content here!',
    inputType: 'editor',
  },
]
