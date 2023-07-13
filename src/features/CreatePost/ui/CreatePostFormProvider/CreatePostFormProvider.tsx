'use client';

import { ReactNode, useMemo, useState } from 'react'
import { CreatePostFormContext, defaultForm } from '../../model/context/createPostFormContext'
import { CreatePostFormRequest } from '../../model/validators/form';

interface CreatePostFormProvider {
  children: ReactNode,
  initialForm?: CreatePostFormRequest,
}

export const CreatePostFormProvider = (props: CreatePostFormProvider) => {
  const { 
    children,
    initialForm
  } = props;

  const [form, setForm] = useState<CreatePostFormRequest>(initialForm || defaultForm);

  const onSet = (newForm: CreatePostFormRequest) => {
    setForm(newForm);
  }

  const defaultProps = useMemo(() => ({
    form,
    setForm: onSet,
  }), [form]);

  return (
    <CreatePostFormContext.Provider value={defaultProps}>
      {children}
    </CreatePostFormContext.Provider>
  )
}