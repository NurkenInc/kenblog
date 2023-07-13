import { buttonVariants } from '@/shared/ui/Button/button';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

// todo: vote it's a separate entity and button should be in that enityty ad should be totally reusable
export const PostVoteShell = () => {
  return ( 
    <div className='flex items-center pr-6'>
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ThumbsUp className='h-5 w-5 text-zinc-700' />
      </div>

      <div className='text-center py-2 font-medium text-sm text-zinc-900'>
        <Loader2 className='h-3 w-3 animate-spin' />
      </div>

      <div className={buttonVariants({ variant: 'ghost' })}>
        <ThumbsDown className='h-5 w-5 text-zinc-700' />
      </div>

      <div className='text-center py-2 font-medium text-sm text-zinc-900'>
        <Loader2 className='h-3 w-3 animate-spin' />
      </div>
    </div>
  )
}