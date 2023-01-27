import React from 'react'
import 'antd/dist/reset.css'
import localFont from '@next/font/local'
import Providers from '@/app/providers'
import '../globals.css'
import BasicLayout from './BasicLayout'

const font = localFont({
  src: '../../assets/fonts/PretendardVariable.woff2',
  // default, can also use "swap" to ensure custom font always shows
  display: 'optional',
})

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={font.className}>
      <head />
      <body>
        <Providers>
          <BasicLayout>{children}</BasicLayout>
        </Providers>
      </body>
    </html>
  )
}
