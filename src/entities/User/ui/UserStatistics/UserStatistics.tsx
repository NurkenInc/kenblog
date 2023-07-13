'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '@/shared/api/actions/users';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/shared/ui/Card/card'
import { Github, Linkedin, Donut } from 'lucide-react';
import Link from 'next/link';

interface UserStatisticsProps {
  userId: string,
}

export const UserStatistics = (props: UserStatisticsProps) => {
  const { userId } = props;

  const { data: user, isFetching, isError } = useQuery({
    queryKey: ['user-details-query'],
    queryFn: () => getUserDetails({ userId }),
    cacheTime: 300000,
  })

  if (isFetching || !user) {
    return (
      <div>I am a Robot</div>
    )
  }
  
  return (
    <div>
      <div className='flex items-center justify-between my-6'>
        <Card>
          <CardHeader>Total Posts</CardHeader>
          <CardContent>
            <h4 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {user?.posts?.length}
            </h4>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Comments</CardHeader>
          <CardContent>
            <h4 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {user?.comments?.length ?? 0}
            </h4>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Followers count</CardHeader>
          <CardContent>
            <h4 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {user?.subscriptions?.length}
            </h4>
          </CardContent>
        </Card>
      </div>
      <Card>
      <Card>
        <CardHeader>Contact me</CardHeader>
        <CardDescription className='m-0 p-0 mb-5 ml-5'>This is socials of {user.username}</CardDescription>
        <CardContent className='flex flex-col justify-center gap-5'>
          <div className='flex items-center gap-4'>
            <Github />
            <div>
              <Link href={user.githubUrl || ''} passHref={true} className='hover:text-blue-500'>
                {user.githubUrl ? 'Github' : 'Not provided'}
              </Link>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Linkedin />
            <div>
              <Link href={user.linkedInUrl || ''} passHref={true} className='hover:text-blue-500'>
                {user.linkedInUrl ? 'Linkedin' : 'Not provided'}
              </Link>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Donut />
            <div>
              <Link href={user.telegramUrl || ''} passHref={true} className='hover:text-blue-500'>
                {user.telegramUrl ? 'Telegram' : 'Not provided'}
              </Link>
            </div>
          </div>
        </CardContent>
        </Card>
      </Card>
    </div>
  )
}