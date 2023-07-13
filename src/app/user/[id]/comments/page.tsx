import { UserCommentsPage } from '@/pages/UserCommentsPage';
import { Sidebar } from '@/widgets/Sidebar';
import { userConfig } from '@/shared/libs/configs/consts/user';

type Params = {
  id: string,
}

interface UserCommentsProps {
  params: Params,
}

export default async function UserComments(props: UserCommentsProps) {
  const { params: { id } } = props;

  return (
    <div className='w-full flex'>
      <Sidebar items={userConfig.sidebarNav(id)} />
      <main className='w-full h-full'>
        <UserCommentsPage userId={id} />
      </main>
    </div>
  )
}