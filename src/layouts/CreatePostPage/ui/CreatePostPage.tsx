import { CreatePostStepper } from '@/features/CreatePost/ui/CreatePostStepper/CreatePostStepper';
import { CreatePostFormProvider } from '@/features/CreatePost';

export const CreatePostPage = () => {
  return (
    <div className="w-full h-full">
      <CreatePostFormProvider>
        <CreatePostStepper />
      </CreatePostFormProvider>
    </div>
  )
}