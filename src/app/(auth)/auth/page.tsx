import { AuthTabs } from '@/widgets/Auth/ui/AuthTabs/AuthTabs';
import { Button } from '@/shared/ui/Button/button';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Authorization',
  description: 'Join our community!',
}

export default function SignIn() {
  return (
    <main>
      <div className='relative'>
        <Button className='absolute top-5 left-5'>
          <ChevronLeft />
          Back
        </Button>
      </div>
      <div className='flex h-[100vh] w-full items-center justify-center'>
        <AuthTabs />
      </div>
    </main>
  )
}