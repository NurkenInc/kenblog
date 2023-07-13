import { PostContentForm } from '../PostContentForm/PostContentForm';
import { PostDetailsForm } from '../PostDetailsForm/PostDetailsForm';
import { PostPreviewForm } from '../PostPreviewForm/PostPreviewForm';

// type Label = 'Preview' | 'Details' | 'Content';

interface CreatePostFormProps {
  label: string,
  onNext: () => void,
  onPrev: () => void,
  onReset: () => void,
}

export const CreatePostForm = (props: CreatePostFormProps) => {
  const { 
    label,
    onNext,
    onPrev,
    onReset,
  } = props;

  if (label === 'Content') {
    return <PostContentForm onNext={onNext} />
  }
  
  if (label === 'Details') {
    return <PostDetailsForm onNext={onNext} onPrev={onPrev} />
  }

  return <PostPreviewForm onPrev={onPrev} onReset={onReset} />
}