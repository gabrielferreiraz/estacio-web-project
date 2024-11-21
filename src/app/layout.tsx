import { Roboto } from 'next/font/google'

import './globals.css'
import Providers from './providers'

export const metadata = {
  title: '',
  description: '',
  robots: { index: false, follow: false },
}

const robotoFont = Roboto({
  weight: ['100', '400', '500', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={(robotoFont.className, 'bg-zinc-400')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
