import { ReactNode } from 'react';

export type InputType = 'textarea' | 'input' | 'file' | 'editor';

export interface FormField<T> {
  name: T,
  label?: ReactNode,
  placeholder?: string,
  description?: ReactNode,
  inputType: InputType,
}