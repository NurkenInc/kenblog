import { BlogsPage } from '@/layouts/BlogsPage'

export const metadata = {
  title: 'Feed',
  description: 'View fresh posts from people all around the world!',
}

export default function Home() {
  return (
    <main className="w-[calc(100vw-320px)] p-5 flex grow shrink-0">
      <BlogsPage />
    </main>
  )
}
