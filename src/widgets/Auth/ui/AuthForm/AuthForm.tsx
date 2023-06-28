"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LogIn } from 'lucide-react';

import { Button } from "@/shared/ui/Button/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form/form"
import { Input } from "@/shared/ui/Input/input"
import { useForm } from 'react-hook-form'
import { Separator } from '@/shared/ui/Separator/Separator';
import { ScrollArea } from '@/shared/ui/ScrollArea/scroll-area';

const formSchema = z.object({
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

export function AuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      avatar: "",
    },
  })

  const onSubmit = () => {
    alert(JSON.stringify(form));
  }

  return (
    <ScrollArea className="h-[70vh] px-3 py-8">
      <Form {...form}>
        <Button className="w-full gap-2" variant="outline">
          <LogIn width={15} height={15} />
          Google
        </Button>
        <p className='w-full text-center'>or</p>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormDescription>
                  This is your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar url</FormLabel>
                <FormControl>
                  <Input placeholder="Avatar url" {...field} />
                </FormControl>
                <FormDescription>
                  You can provide url to your avatar(optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>        </form>
      </Form>
    </ScrollArea>
  )
}
