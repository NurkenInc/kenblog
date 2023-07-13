import { Loader2 } from 'lucide-react'

export default function loader() {
  return (
    <div className='w-[100vw] h-[100vh] items-center justify-center flex'>
      <Loader2 className='animate-spin' />
    </div>
  )
}