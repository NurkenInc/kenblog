'use client';

import { useContext } from 'react';
import { Button } from '@/shared/ui/Button/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { PostType } from '../../model/schemas/preview.schema';
import { uploadImage } from '@/shared/libs/utils/file';
import { CreatePostFormContext } from '../../model/context/createPostFormContext';
import { PostPreview } from '@/entities/Post/ui/PostPreview/PostPreview';
import { useSession } from 'next-auth/react';
import { api } from '@/shared/api/api';
import { getQueryClient } from '@/shared/libs/utils/query';

interface PostPreviewFormProps {
  onPrev: () => void,
  onReset: () => void,
}

// single responsibility SOLID vioaltion
export const PostPreviewForm = (props: PostPreviewFormProps) => {
  const { 
    onPrev: stepperPrev,
    onReset: stepperReset, 
  } = props;
  const { form } = useContext(CreatePostFormContext);
  const { category, tags, title, content, thumbnail } = form;
  const { data: session } = useSession();
  const queryClient = getQueryClient();

  const router = useRouter();

  const primTags = tags?.map(tag => tag.tag);

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async () => {
      let imageUrl = '';
      if (thumbnail) {
        imageUrl = await uploadImage(thumbnail);
      }
      const payload: PostType = {
        category,
        content,
        tags: primTags,
        title,
        thumbnail: imageUrl,
      }
      const { data } = await api.post('/api/posts/create', payload);
      return data;
    },
    onError: () => {
      toast.error('Something went wrong, could not create post. Please try again');
    },
    onSuccess: () => {
      toast.success('Your post was successfully created. Congrats!');
      queryClient.invalidateQueries({ queryKey: ['infinite-posts-query'] })
    }
  })

  const onReset = () => {
    stepperReset();
  }

  const onPost = async () => {
    try {
      // if (type === 'create') {

      // }

      await createPost();

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-3 w-[500px]">
      <PostPreview form={form} user={session?.user} />
      {/* <PostListItem post={post} preview /> */}
      <Button disabled={isLoading} type="button" onClick={stepperPrev} className="w-full">Previous</Button>
      <Button isLoading={isLoading} type="button" className="w-full" onClick={onPost}>Post</Button>
      <Button disabled={isLoading} type="button" className="w-full" variant="destructive" onClick={onReset}>Reset</Button>
    </div>
  )
}