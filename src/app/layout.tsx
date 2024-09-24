import { Roboto } from 'next/font/google'
import './globals.css'

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
      <body className={robotoFont.className}>{children}</body>
    </html>
  )
}
