'use client';

import { Label } from '@/shared/ui/Label/label';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { Textarea } from '@/shared/ui/Textarea/textarea';
import { Button } from '@/shared/ui/Button/button';
import { useMutation } from '@tanstack/react-query';
import { CommentRequest } from '../../model/validators/comment';
import axios, { AxiosError } from 'axios';
import { useCustomToast } from '@/shared/libs/hooks/use-custom-toast';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ExtendedComment } from '@/shared/libs/types/db/db';

interface CreateCommentFormProps {
  postId: string,
  replyToId?: string,
  onCancel?: () => void,
  autoFocus?: boolean,
  comment?: ExtendedComment | null,
}

export const CreateCommentForm = (props: CreateCommentFormProps) => {
  const { postId, replyToId, onCancel, autoFocus, comment: replyToComment } = props;
  
  const [comment, setComment] = useState<string>((replyToComment && `@${replyToComment?.author.username}`) ?? '')
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }

  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      }

      const { data } = await axios.patch(`/api/posts/comment`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        return toast.error('Something went wrong. Your vote wasnt registered');
      }
    },
    onSuccess: () => {
      router.refresh();
      setComment('');
      onCancel?.();
    }
  })

  const onComment = () => {
    createComment({ postId, text: comment, replyToId });
  }

  const setCaret = (e: FocusEvent<HTMLTextAreaElement>) => {
    e.target.value += ' ';
  }

  return (
    <div className='grid w-full gap-1.5'>
      <Label htmlFor='comment'>Your comment</Label>
      <div className='mt-2'>
        <Textarea
          autoFocus={autoFocus}
          onFocus={setCaret}
          id='comment' 
          value={comment} 
          rows={1}
          placeholder='What your thoughts are?'
          onChange={onChange}
        />

        <div className='mt-2 flex justify-end gap-2'>
          {replyToId && (
            <Button onClick={onCancel} tabIndex={-1} variant="secondary">
              Cancel
            </Button>
          )}
          <Button 
            disabled={isLoading || comment.length === 0}
            onClick={onComment}
            isLoading={isLoading}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}