import { Icons } from '@/shared/ui/Icons/icons';

export type DropdownItem = {
  title: string
  disabled?: boolean
} & (
  | {
    onClick?: never
    href: string
  } | {
    onClick: () => void
    href?: never
  }
)
