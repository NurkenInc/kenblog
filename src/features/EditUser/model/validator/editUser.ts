import { z } from 'zod';
import { EditUserFields } from '../types/editUser';

export const editUserFormSchema = z.object({
  name: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
  description: z.string().optional().or(z.literal('')),
  linkedInUrl: z.string().regex(/^https?:\/\/(?:www\.)?linkedin\.com\/(?:in|pub|company)\/[a-zA-Z0-9\-]+\/?$/, { message: 'Invalid URL' }).optional().or(z.literal('')),
  githubUrl: z.string().regex(/^https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9\-]+\/?$/, { message: 'Invalid URL' }).optional().or(z.literal('')),
  telegramUrl: z.string().regex(/^https?:\/\/t(?:elegram|\.me)\/[a-zA-Z0-9_]{5,32}\/?$/, { message: 'Invalid URL' }).optional().or(z.literal('')),
})

export type EditUserRequest = z.infer<typeof editUserFormSchema>;

export const formFields: EditUserFields = [
  {
    name: 'name',
    label: 'Display name',
    placeholder: 'Jonh Smith',
    description: 'Enter your display name that you are comfortable with',
    inputType: 'input',
  },
  {
    name: 'description',
    label: 'Bio',
    placeholder: 'Hi! I\'m Jonh Smith 21 y.o UI Designer in New-York!',
    description: 'How about your biography?',
    inputType: 'textarea',
  },
  {
    name: 'linkedInUrl',
    label: 'Linkedin',
    placeholder: 'https://www.linkedin.com/in/jonhsmith',
    description: 'What about your linkedin account?',
    inputType: 'input',
  },
  {
    name: 'githubUrl',
    label: 'Github',
    placeholder: 'https://github.com/jonhsmith',
    description: 'Wanna share github account?',
    inputType: 'input',
  },
  {
    name: 'telegramUrl',
    label: 'Telegram',
    placeholder: 'https://t.me/jonhsmith',
    description: 'Do you have telegram account?',
    inputType: 'input',
  },
]