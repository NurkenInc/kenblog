import { UserConfig } from '../../types/nav/nav';

export const userConfig: UserConfig = {
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
  sidebarNav: (userId) => [
    {
      title: 'Profile',
      href: `/user/${userId}/profile`,
    },
    {
      // comments that other users commented about this user, not comments that this user leaved
      title: 'Comments',
      href: `/user/${userId}/comments`,
    },
    {
      title: 'Statistics',
      href: `/user/${userId}/statistics`,
    },
  ],
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