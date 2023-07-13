"use client"

import * as z from "zod"
import { useCallback, useContext, useEffect } from 'react';
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
import { useFieldArray } from 'react-hook-form'
import { ScrollArea } from '@/shared/ui/ScrollArea/scroll-area';
import { detailsFormSchema, formFields } from '../../model/schemas/details.schema';
import { useZodForm } from '@/shared/libs/hooks/useZodForm';
import { CreatePostFormContext } from '../../model/context/createPostFormContext';

interface PostDetailsFormProps {
  onNext: () => void,
  onPrev: () => void,
}

type Tags = z.infer<typeof detailsFormSchema>;

// code splitting? extract to another page
// Solid Single responsibility?
export const PostDetailsForm = (props: PostDetailsFormProps) => {
  const { onNext: nextStepper, onPrev: prevStepper } = props;
  const { form: formState, setForm } = useContext(CreatePostFormContext);
  const form = useZodForm({
    schema: detailsFormSchema,
    mode: "all",
    defaultValues: {
      tags: formState.tags,
    },
  })
  const {
    control,
    register,
    getValues,
    setFocus,
    formState: { isValid, errors },
    trigger,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })
  
  const isSubmittable = !!isValid && !Boolean(formState.uniqueError);
  
  const saveForm = () => {
    const data = getValues();
    setForm({...formState, tags: data.tags});
  }

  const onNext = () => {
    saveForm();
    nextStepper();
  }
  
  const onPrev = () => {
    saveForm();
    prevStepper();
  }
  
  const onAdd = () => {
    append({ tag: '' });
    isUnique();
    trigger();
  }

  const onRemove = (index: number) => {
    remove(index);
    isUnique();
    trigger();
  }

  const isUnique = useCallback(() => {
    const tags = getValues().tags;
    const tagsPrim = tags?.map((tag) => tag.tag);
    const unique = new Set(tagsPrim);
    
    if (!(unique.size === tagsPrim?.length)) {
      return setForm({ ...formState, uniqueError: 'All tags must be unique' });
    }

    setForm({ ...formState, uniqueError: undefined });
  }, [getValues, setForm, formState])

  useEffect(() => {
    setFocus('tags.0.tag');
  }, [setFocus])

  return (
    <ScrollArea className='h-[500px] px-8 w-[500px]'>
      <Form {...form}>
        <form className="space-y-8">
          {formFields.map(formField => (
            <FormField
              key={formField.name}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormDescription>
                    {formField.description}
                  </FormDescription>
                </FormItem>
              )}
            />
          ))}  
          <div>
            {
              fields.map((dynamicField, index) => {
                const errorForField = errors?.tags?.[index]?.tag;
                return (
                  <FormControl key={dynamicField.id}>
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <Input
                          error={Boolean(errorForField)} 
                          placeholder={'Your tag'} 
                          {...register(`tags.${index}.tag` as const, {
                            onChange: (e) => {isUnique()}
                          })} 
                          className="my-4" 
                        />
                        {index > 0 && (
                          <Button type="button" onClick={() => onRemove(index)}>
                            Remove
                          </Button>
                        )}
                      </div>
                      <FormMessage>{errorForField?.message ?? <>&nbsp;</>}</FormMessage>
                    </>
                  </FormControl>
                )
              })
            }
            <FormMessage>{errors.tags?.message}</FormMessage>
            <FormMessage>{formState.uniqueError}</FormMessage>
            <Button type="button" className="mt-5" onClick={onAdd}>
              Add
            </Button>
          </div>
          <Button type="button" onClick={onPrev} className="w-full">Previous</Button>
          <Button disabled={!isSubmittable} type="button" onClick={onNext} className="w-full">Next</Button>
        </form>
      </Form>
    </ScrollArea>
  )
}
