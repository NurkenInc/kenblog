'use client';

import { ExtendedUser } from '@/shared/libs/types/db/db';
import { Button } from '@/shared/ui/Button/button';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { SubscriptionRequest } from '../../model/subscriptions';
import axios, { AxiosError } from 'axios';
import { useCustomToast } from '@/shared/libs/hooks/use-custom-toast';
import { toast } from 'react-toastify';
import { getQueryClient } from '@/shared/libs/utils/query';

interface SubscriptionButtonProps {
  userInView: ExtendedUser
}

// todo: server component and  client component like vote btns 
// todo: something wrong maybe make directly in userDetails?
export const SubscriptionButton = (props: SubscriptionButtonProps) => {
  const { userInView } = props;
  const { data: session } = useSession();
  const { loginToast } = useCustomToast();
  const queryClient = getQueryClient();

  const { mutate: onSubscribe, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscriptionRequest = {
        userInViewId: userInView?.id,
      }

      await axios.patch('/api/user/subscribe', payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        return toast.error('Something went wrong. Your subscribe wasnt registered');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-details-query']});
    }
  })
 
  const isSubscribed = userInView?.subscriptions?.find(sub => sub.userId === session?.user.id)

  // todo: if followed something like you are followed with dropdown where you can unfollow like youtube
  return (
    <Button 
      isLoading={isLoading} 
      variant={isSubscribed ? 'outline' : 'default'} 
      disabled={!session?.user}
      onClick={() => onSubscribe()}
    >
      {isSubscribed ? 'Unfollow' : 'Follow'}
    </Button>
  )
}