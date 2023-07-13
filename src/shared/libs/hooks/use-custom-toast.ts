import { toast } from 'react-toastify';

export const useCustomToast = () => {
  const loginToast = () =>{
    toast.error('You need to be logged in to do that.')
  }
  // todo: use shadcn toast with actions

  return { loginToast };
}
// https://www.youtube.com/watch?v=mSUKMfmLAt0