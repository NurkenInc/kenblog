import { UserProfilePage } from '@/layouts/UserProfilePage';
import { Sidebar } from '@/widgets/Sidebar';
import { userConfig } from '@/shared/libs/configs/consts/user';

type Params = {
  id: string,
}

interface UserProfileProps {
  params: Params,
}

export default async function UserProfile(props: UserProfileProps) {
  const { params: { id } } = props;

  return (
    <div className='w-full flex'>
      <Sidebar items={userConfig.sidebarNav(id)} />
      <main className='w-full h-full'>
        <UserProfilePage userId={id} />
      </main>
    </div>
  )
}