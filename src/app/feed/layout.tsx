import { feedConfig } from '@/shared/libs/configs/consts/feed';
import { Navbar } from '@/widgets/Navbar';
import { BlogsSidebar } from '@/layouts/BlogsPage';

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div>
      <Navbar items={feedConfig.mainNav} dropdownItems={feedConfig.dropdown} />
      <div className='w-full flex'>
        {children}
        <BlogsSidebar />
      </div>
    </div>
  )
}
