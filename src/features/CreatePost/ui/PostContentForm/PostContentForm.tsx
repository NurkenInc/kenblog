"use client"

import * as z from "zod"
import { ChangeEvent, useEffect, useCallback, useState, useContext } from 'react';
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
import { contentFormSchema, formFields } from '../../model/schemas/content.schema';
import { useZodForm } from '@/shared/libs/hooks/useZodForm';
import { ScrollArea } from '@/shared/ui/ScrollArea/scroll-area';
import { renderInputComponent } from '@/shared/libs/utils/input';
import { fileUpload } from '@/shared/libs/utils/file';
import { toast } from 'react-toastify';
import { CreatePostFormContext } from '../../model/context/createPostFormContext';

type Content = z.infer<typeof contentFormSchema>;

interface PostContentForm {
  onNext: () => void,
}

// Single responsibility principle is violated?
export const PostContentForm = (props: PostContentForm) => {
  const { onNext: stepperNext } = props;
  const { form: formState, setForm } = useContext(CreatePostFormContext)
  const form = useZodForm({
    schema: contentFormSchema,
    mode: "all",
    defaultValues: {
      category: formState.category,
      thumbnail: formState.thumbnail,
      content: formState.content,
      title: formState.title,
    },
  });

  const { 
    handleSubmit,
    control,
    register,
    formState: { isValid, errors },
    setFocus,
  } = form;

  useEffect(() => {
    setFocus('title');
  }, [setFocus])

  const onNext = useCallback((data: Content) => {
    setForm({
      ...formState,
      category: data.category,
      title: data.title,
    })
    stepperNext();
  }, [formState, setForm, stepperNext])

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => fileUpload(
    (result: string) => setForm({ ...formState, thumbnail: result }),
    () => toast.error('You should upload an image!'),
    e.target.files?.[0],
  ), [setForm, formState]);

  const isSubmittable = !!Boolean(errors) && !!isValid;

  return (
    <ScrollArea className='h-[500px] px-8'>
      <Form {...form}>
        <form onSubmit={handleSubmit(onNext)} className="space-y-8">
          {formFields.map((formField, index) => (
            <FormField
              key={formField.name}
              control={form.control}
              name={formField.name}
              render={({ field }) => {
                const errorForField = errors?.[field.name];
                return (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      {renderInputComponent(formField, field, control, errorForField, onFileChange, () => register(formField.name))}
                    </FormControl>
                    <FormDescription>
                      {formField.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          ))}
          <Button disabled={!isSubmittable} type="submit" className="w-full">Next</Button>
        </form>
      </Form>
    </ScrollArea>
  )
}
