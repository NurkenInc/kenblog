import { CreatePostPage } from '@/pages/CreatePostPage';
import { RouteGuard } from '@/processes/Routes/RouteGuard';

export default function CreatePost() {
  return (
    <RouteGuard callbackUrl='create-post'>
      <main className="max-w-7xl mx-auto">
        <CreatePostPage />
      </main>
    </RouteGuard>
  )
}