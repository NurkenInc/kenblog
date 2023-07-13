import { GeneralFeed } from '../GeneralFeed/GeneralFeed';
import { getAuthSession } from '@/shared/libs/configs/session/session';
import { CustomFeed } from '../CustomFeed/CustomFeed';
import { BlogsPageFilters } from '../BlogsPageFilters/BlogsPageFilters';

export const BlogsPage = async () => {
  const session = await getAuthSession();
  
  return (
    <div className='w-full'>
      <div>
        <div className='max-h-11'>
          <BlogsPageFilters />
        </div>
        {session ? <CustomFeed user={session?.user} /> : <GeneralFeed />}
      </div>
    </div>
  )
}