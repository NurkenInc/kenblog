import { createContext } from 'react';
import { CreatePostFormRequest } from '../validators/form';

export const defaultForm: CreatePostFormRequest = {
  title: '',
  category: '',
  content: '',
  thumbnail: '',
  tags: [ { tag: '' } ],
  uniqueError: '',
  currentStep: 1,
}

export const CreatePostFormContext = createContext<{ 
  form: CreatePostFormRequest,
  setForm: (form: CreatePostFormRequest) => void,
}>
(
  {
    form: defaultForm,
    setForm: (form: CreatePostFormRequest) => {},
  }  
)