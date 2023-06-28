import { ReactNode, memo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog/dialog";
import { AuthForm } from '../AuthForm/AuthForm';

interface AuthModalProps {
  className?: string,
  trigger?: ReactNode,
}

export const AuthModal = memo((props: AuthModalProps) => {
  const { 
    className,
    trigger,
  } = props

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <AuthForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
})