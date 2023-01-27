'use client'

import React from 'react'
import Script from 'next/script'
import { NaverUserInfo } from '@/types/user'

interface NaverLoginProps {
  onGetNaverUserInfo?: (user: NaverUserInfo) => void
}

const NaverLogin = ({ onGetNaverUserInfo }: NaverLoginProps) => {
  return (
    <>
      <div id="naverIdLogin" />
      <Script
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
        onLoad={() => {
          const naverLogin = new window.naver.LoginWithNaverId({
            clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            callbackUrl: 'http://localhost:3000',
            isPopup: false,
            loginButton: { color: 'white', type: 2, height: '45' },
          })
          naverLogin.init()
          naverLogin.getLoginStatus((status: any) => {
            if (!status) return
            onGetNaverUserInfo?.(naverLogin.user)
          })
        }}
      />
    </>
  )
}

export default NaverLogin
