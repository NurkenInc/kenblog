import { 
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '@/shared/ui/Card/card';
import { Button } from '@/shared/ui/Button/button';
import { UserAvatar } from '@/entities/User';
import { EditorOutput } from '@/features/Editor';
import { ThumbsUp, ThumbsDown, MessageSquare, Eye } from 'lucide-react';
import { ExtendedUser } from '@/shared/libs/types/db/db';

type FormPreview = {
  title: string,
  thumbnail?: string,
  content?: string,
  category: string,
  tags?: { tag?: string }[],
}

interface PostPreviewProps {
  form: FormPreview
  user?: ExtendedUser
}

export const PostPreview = async (props: PostPreviewProps) => {
  const {
    form,
    user,
  } = props;

  return (
    <Card className='max-h-max'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <UserAvatar
            src={user?.image}
            fallback={user?.name}
          />
          <div>
            <div className='flex items-center gap-1'>
              <CardTitle>{user?.username}</CardTitle>
              {' '}
              <p>Just now</p>
            </div>
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <section className='flex flex-row items-start justify-between mb-2'>
          <div>
            <h4 className="scroll-m-20 text-[14px] lg:text-xl font-semibold tracking-tight break-words whitespace-normal">
              {form.title}
            </h4>
            <div className='relative text-sm max-h-16 w-full overflow-clip'>
              <EditorOutput content={form.content} />
            </div>
          </div>
        </section>
        <Button disabled>
          Read
        </Button>
      </CardContent>
      <CardFooter>
        {/* {post.tags?.[0] && post.tags.map(tag => (
          <Button key={tag} variant={"outline"} className="rounded-full">
            {tag}
          </Button>
        ))} */}
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-5'>
            <Button variant='ghost'>
              <ThumbsUp className='h-5 w-5 mr-1.5 text-zinc-700' />
              <span>0</span>
            </Button>
            <Button variant='ghost'>
              <ThumbsDown className='h-5 w-5 mr-1.5 text-zinc-700' />
              <span>0</span>
            </Button>
            <Button variant='ghost'>
              <MessageSquare className='h-5 w-5 mr-1.5 text-zinc-700' />
              <span>0</span>
            </Button>
          </div>
          <Button variant='ghost'>
            <Eye className='h-5 w-5 mr-1.5 text-zinc-700' />
            <span>0</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  ) 
}