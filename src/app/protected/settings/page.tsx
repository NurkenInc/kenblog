import { RouteGuard } from '@/processes/Routes/RouteGuard'
import { SettingsPage } from '@/pages/SettingsPage'

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings'
}

export default function Settings() {
  return (
    <div className='min-h-screen w-full'>
      <SettingsPage />
    </div>
  )
}