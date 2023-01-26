import React from 'react'
import 'antd/dist/reset.css'
import Script from 'next/script'
import localFont from '@next/font/local'
import AntdProvider from '@/components/AntdProvider/AntdProvider'
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
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  )
}
