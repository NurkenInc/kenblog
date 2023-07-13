import { ChangeEvent, ReactNode } from 'react';
import { ControllerRenderProps, FieldError, FieldValues, Controller, Control } from 'react-hook-form'
import { FormField } from '../types/form/types';
import { Input } from '@/shared/ui/Input/input';
import { Textarea } from '@/shared/ui/Textarea/textarea';
import { Editor } from '@/features/Editor';

// what the fuck is this?
export function renderInputComponent<T extends FieldValues, F>(
  formField: FormField<F>,
  // field: ControllerRenderProps<T>,
  field: any,
  control: Control<T>,
  // errorForField?: FieldError, 
  errorForField?: any, 
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  register?: () => any,
): ReactNode {
  switch (formField.inputType) {
    case 'file': return (
      <Controller
        control={control}
        name={field.name}
        render={({ field: { value, onChange, ...field } }) => {
          return (
            <Input
              {...field}
              value={value?.fileName}
              onChange={(e) => onFileChange?.(e)}
              type="file"
              id="picture"
            />
          );
        }}
      />
    )
    case 'textarea': return <Textarea error={Boolean(errorForField)} {...field} />
    case 'input': return <Input {...register?.()} error={Boolean(errorForField)} placeholder={formField.placeholder} {...field} />;
    case 'editor': return <Editor placeholder={formField.placeholder} />;
    default: return <Input error={Boolean(errorForField)} placeholder={formField.placeholder} {...field} />;
  }
}