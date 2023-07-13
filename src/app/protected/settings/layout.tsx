import { settingsConfig } from '@/shared/libs/configs/consts/settings';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { RouteGuard } from '@/processes/Routes/RouteGuard';

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <RouteGuard>
      <div>
        <Navbar items={settingsConfig.mainNav} dropdownItems={settingsConfig.dropdown} />
        <div className='w-full flex'>
          <Sidebar items={settingsConfig.sidebarNav} />
          {children}
        </div>
      </div>
    </RouteGuard>
  )
}
