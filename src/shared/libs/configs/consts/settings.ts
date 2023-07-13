import { SettingsConfig } from '../../types/nav/nav';

export const settingsConfig: SettingsConfig = {
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
  sidebarNav: [
    // make sadiebar and navbar on layout and usee edit in /protected/settings/edit
    {
      title: 'Settings',
      href: '/protected/settings',
    },
    {
      title: 'Savings',
      href: '/protected/settings/savings',
    }
  ],
  dropdown: [
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