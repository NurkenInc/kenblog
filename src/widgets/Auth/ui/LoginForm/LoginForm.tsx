"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { AuthProviders } from '../AuthProviders/AuthProviders';
import { loginFormSchema, defaultValues, formFields } from '../../model/schemas/login.schema';

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  })

  const onSubmit = () => {
    alert(JSON.stringify(form));
  }

  return (
    <ScrollArea className="h-[70vh] px-3">
      <Form {...form}>
        <AuthProviders />
        <p className='w-full text-center'>or</p>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formFields.map(formField => (
            <FormField
              key={formField.name}  
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={formField.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>
                    {formField.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full">Submit</Button>        </form>
      </Form>
    </ScrollArea>
  )
}
