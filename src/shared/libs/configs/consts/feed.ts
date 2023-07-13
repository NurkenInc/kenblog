import { FeedConfig } from '../../types/nav/nav';

export const feedConfig: FeedConfig = {
  mainNav: [
    {
      title: 'Feed',
      href: '/feed',
    },
    {
      title: 'Profile',
      href: '/protected/profile'
    },
  ],
  sidebarNav: [],
  dropdown: [
    {
      title: 'Settings',
      href: '/protected/settings',
    },
    {
      title: 'Dashboard',
      href: '/protected/dashboard'
    },
    {
      title: 'Notifications',
      href: '/protected/notifications'
    },
  ]
}