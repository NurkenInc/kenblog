import CloseModal from '@/shared/ui/Dialog/close-dialog';
import { AuthTabs } from '../AuthTabs/AuthTabs';

export const AuthModal = () => {
  return (
    <div className='fixed inset-0 bg-zinc-900/20 z-50'>
      <div className='container flex items-center h-full max-w-lg mx-auto'>
        <div className='relative bg-white w-full pt-4 h-fit px-2 rounded-lg'>
          <div className='absolute top-4 right-4'>
            <CloseModal />
          </div>

          <AuthTabs />
        </div>
      </div>
    </div>
  )
}