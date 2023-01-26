import React from 'react'
import 'antd/dist/reset.css'
import localFont from '@next/font/local'
import AntdProvider from '@/components/AntdProvider/AntdProvider'
import '../globals.css'

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
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  )
}
