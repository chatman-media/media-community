import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Chatman.media - Сообщество свободных и креативных людей',
  description:
    'Платформа для объединения творческих и свободных людей. Помогаем перейти от работы в системе к свободе и творчеству.',
  keywords: ['творчество', 'фриланс', 'креатив', 'сообщество', 'независимость'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
