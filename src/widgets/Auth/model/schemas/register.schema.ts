import * as z from "zod"
import { RegisterFields } from '../types/register.type'

export const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  avatar: z.string().url({
    message: "Invalid url",
  }).optional().or(z.literal('')),
})

export const defaultValues = {
  username: "",
  email: "",
  password: "",
  avatar: "",
}

// selectors???
export const formFields: RegisterFields = [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'username',
    description: 'Choose your display name',
    inputType: 'input',
  },
  {
    name: 'email',
    label: 'Email Adress',
    placeholder: 'email',
    description: 'This is your email address',
    inputType: 'input',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'password',
    description: 'This is your password and a little secret',
    inputType: 'input',
  },
  {
    name: 'avatar',
    label: 'Avatar URL(optional)',
    placeholder: 'password',
    description: 'You can enter url to your avatar',
    inputType: 'input',
  },
]
