// todo: delete react redux if its used only for form and make iit context
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import { Providers } from '@/globals/providers/Providers';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KenBlog',
  description: 'KenBlog is blog app for sharing posts',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode,
  authModal: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className={inter.className}>
        <Providers>
          {authModal}

          {/* <div className='max-w-screen-xl flex min-h-[100vh] items-start justify-center mx-auto'> */}
            {children}
          {/* </div> */}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  )
}
