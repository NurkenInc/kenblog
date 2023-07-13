'use client';

import { useCustomToast } from '@/shared/libs/hooks/use-custom-toast';
import { Button } from '@/shared/ui/Button/button';
import { VoteType } from '@prisma/client';
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/shared/libs/utils/utils';
import { useMutation } from '@tanstack/react-query';
import { PostVoteRequest } from '../../../model/validator/votes';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface PostVoteButtonProps {
  postId: string,
  initialLikes: number,
  initialDislikes: number,
  initialVote?: VoteType | null,
  disabled: boolean
}

// todo: vote it's a separate entity and button should be in that enityty ad should be totally reusable
export const PostVoteButtonClient = (props: PostVoteButtonProps) => {
  const {
    postId,
    initialDislikes,
    initialLikes,
    initialVote,
    disabled
  } = props;

  const { loginToast } = useCustomToast();
  const [likesAmount, setLikesAmount] = useState<number>(initialLikes);
  const [dislikesAmount, setDislikesAmount] = useState<number>(initialDislikes);
  const [currentVote, setCurrentVote] = useState(initialVote);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote])

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      }

      await axios.patch('/api/posts/vote', payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        return toast.error('Something went wrong. Your vote wasnt registered');
      }
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === 'UP') setLikesAmount(prev => prev - 1);
        else if (type === 'DOWN') setDislikesAmount(prev => prev - 1)
      } else if (currentVote !== type && currentVote) {
        setCurrentVote(type);
        if (type === 'UP') { 
          setDislikesAmount(prev => prev - 1);
          setLikesAmount(prev => prev + 1);
        }
        else if (type === 'DOWN') { 
          setLikesAmount(prev => prev - 1);
          setDislikesAmount(prev => prev + 1);
        }
      } else {
        setCurrentVote(type);
        if (type === 'UP') { 
          setLikesAmount(prev => prev + 1);
        }
        else if (type === 'DOWN') { 
          setDislikesAmount(prev => prev + 1);
        }
      }
    }
  })

  const onVote = (voteType: VoteType) => () => {
    vote(voteType);
  }

  return (
    <div className='flex gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
      <Button onClick={onVote('UP')} size='sm' variant='ghost' aria-label='upvote' disabled={disabled}>
        <ThumbsUp className={cn('h-5 w-5 text-zinc-700', {
          'text-blue-500 fill-blue-500': currentVote === 'UP'
        })} />
      </Button>

      <p className='text-center py-2 font-medium text-sm text-zinc-900'>
        {likesAmount}
      </p>

      <Button size='sm' variant='ghost' aria-label='downvote' disabled={disabled}>
        <ThumbsDown onClick={onVote('DOWN')} className={cn('h-5 w-5 text-zinc-700', {
          'text-red-500 fill-red-500': currentVote === 'DOWN'
        })} />
      </Button>

      <p className='text-center py-2 font-medium text-sm text-zinc-900'>
        {dislikesAmount}
      </p>
    </div>
  )
}
