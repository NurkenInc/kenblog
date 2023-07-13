import * as z from "zod"
import { DetailsFields } from '../types/details.type'

const tagSchema = z.string().regex(/^[a-zA-Z]+$/).min(2, {
  message: 'Please enter at least 2 characters for tag'
}).max(30, {
  message: 'Maximum characters limit is 30'
}).or(z.literal(''))

export const detailsFormSchema = z.object({
  tags: z.object({ tag: tagSchema })
    .array()
    .max(10, {
      message: 'Maximum tags limit is 10, sorry:('
    }),
})

// selectors???
export const formFields: DetailsFields = [
  {
    name: 'tags',
    label: 'Additional tags to post',
    placeholder: 'Some title',
    inputType: 'input',
  },
]
