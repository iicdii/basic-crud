import React from 'react'
import 'antd/dist/reset.css'
import localFont from '@next/font/local'
import Providers from '@/app/providers'
import '../globals.css'

const font = localFont({
  src: '../../assets/fonts/PretendardVariable.woff2',
  // default, can also use "swap" to ensure custom font always shows
  display: 'optional',
})

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={font.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
