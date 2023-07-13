'use client';

import { useZodForm } from '@/shared/libs/hooks/useZodForm';
import { EditUserRequest, editUserFormSchema, formFields } from '../../model/validator/editUser';
import { User } from '@prisma/client';
import { Button } from '@/shared/ui/Button/button';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { EditUserFormField } from '../EditUserFormField/EditUserFormField';
import { Form } from "@/shared/ui/Form/form";

interface EditUser {
  user?: User,
}

export const EditUserForm = (props: EditUser) => {
  const { user } = props;
  const router = useRouter();
  
  const form = useZodForm({
    schema: editUserFormSchema,
    mode: 'all',
    defaultValues: {
      name: user?.username || '',
      description: user?.description || '',
      githubUrl: user?.githubUrl || '',
      linkedInUrl: user?.linkedInUrl || '',
      telegramUrl: user?.telegramUrl || '',
    }
  })

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: async ({ name, description, githubUrl, linkedInUrl, telegramUrl }: EditUserRequest) => {
      const payload: EditUserRequest = { 
        name,
        description,
        githubUrl,
        linkedInUrl,
        telegramUrl,
      };

      const { data } = await axios.patch(`/api/user/edit`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error('Username already taken. Please choose different username');
        }

        return toast.error('Something went wrong. Your settings weren\'t registered');
      }
    },
    onSuccess() {
      toast.success('Your profile settings were updated successfully.')
      router.refresh();
    },
  })

  const onEdit = (data: EditUserRequest) => {
    updateUser(data);
  }
      
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onEdit)}>
          {formFields.map(field => (
            <EditUserFormField  
                key={field.name}
                name={field.name}
                control={form.control}
                description={field.description}
                placeholder={field.placeholder}
                label={field.label}
                type={field.inputType}
              />
            ))
          }
          <Button type="submit" isLoading={isLoading} className='mt-5'>
            Save Settings
          </Button>
      </form>
    </Form>
  )
}  