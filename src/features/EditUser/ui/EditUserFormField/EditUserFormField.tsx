import { Input } from '@/shared/ui/Input/input';
import { Control } from 'react-hook-form';
import { EditUserRequest } from '../../model/validator/editUser';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form/form"
import { InputType } from '@/shared/libs/types/form/types';
import { ReactNode } from 'react';

interface EditUserFormFieldProps {
  name: 'name' | 'description' | 'linkedInUrl' | 'githubUrl' | 'telegramUrl'
  control: Control<EditUserRequest>
  description?: ReactNode
  label?: ReactNode
  placeholder?: string
  type: InputType
}

export const EditUserFormField = (props: EditUserFormFieldProps) => {
  const { name, description, label, placeholder } = props;

  return (
    <FormField
      key={name}  
      // control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}