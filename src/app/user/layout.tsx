import { userConfig } from '@/shared/libs/configs/consts/user';
import { Navbar } from '@/widgets/Navbar';
import { QueryProvider } from '@/globals/providers/QueryProvider';

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <QueryProvider>
      <div>
        <Navbar items={userConfig.mainNav} dropdownItems={userConfig.dropdown} />
        <div className='w-full flex'>
          {children}
        </div>
      </div>
    </QueryProvider>
  )
}
