import { UserStatisticsPage } from '@/layouts/UserStatisticsPage';
import { Sidebar } from '@/widgets/Sidebar';
import { userConfig } from '@/shared/libs/configs/consts/user';

type Params = {
  id: string,
}

interface UserStatisticsProps {
  params: Params,
}

export default async function UserStatistics(props: UserStatisticsProps) {
  const { params: { id } } = props;

  return (
    <div className='w-full flex'>
      <Sidebar items={userConfig.sidebarNav(id)} />
      <main className='w-full h-full'>
        <UserStatisticsPage userId={id} />
      </main>
    </div>
  )
}