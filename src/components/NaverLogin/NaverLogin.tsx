'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'

const NaverLogin = () => {
  const router = useRouter()
  const naverLogin = useRef<any>()

  useEffect(() => {
    if (!naverLogin.current) return

    // naverLogin.current.getLoginStatus((status: any) => {
    //   router.push('/main')
    // })
  }, [router])

  return (
    <>
      <Script
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
        onLoad={() => {
          naverLogin.current = new window.naver.LoginWithNaverId({
            clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            callbackUrl: 'http://localhost:3000/callback/login',
            isPopup: false,
            loginButton: { color: 'white', type: 2, height: '45' },
          })
          naverLogin.current.init()
        }}
      />
      <div id="naverIdLogin" />
    </>
  )
}

export default NaverLogin
