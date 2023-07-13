import * as z from "zod"
import { LoginFields } from '../types/login.type'

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})

export const defaultValues = {
  email: "",
  password: "",
}

// selectors???
export const formFields: LoginFields = [
  {
    name: 'email',
    label: 'Email Address',
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
]
