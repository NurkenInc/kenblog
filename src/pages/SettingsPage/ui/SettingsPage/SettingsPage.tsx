import { EditUserForm } from '@/features/EditUser';
import { getAuthSession } from '@/shared/libs/configs/session/session'


export const SettingsPage = async () => {
  const session = await getAuthSession();

  return (
    <div className='w-full p-4'>
      <div className='grid items-start gap-8'>
        <h2 className='font-bold text-3xl md:text-4xl py-2'>Settings</h2>
      </div>

      <div className='grid gap-10'>
        <EditUserForm user={session?.user} />
      </div>
    </div>
  )
}