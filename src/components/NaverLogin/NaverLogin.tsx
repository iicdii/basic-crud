'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const NaverLogin = () => {
  const router = useRouter()
  const naverLogin = useRef<any>()

  useEffect(() => {
    naverLogin.current = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/callback/login',
      isPopup: false,
      loginButton: { color: 'white', type: 2, height: '45' },
    })
    naverLogin.current.init()
  }, [])

  useEffect(() => {
    if (!naverLogin.current) return

    // naverLogin.current.getLoginStatus((status: any) => {
    //   router.push('/main')
    // })
  }, [router])

  return <div id="naverIdLogin" />
}

export default NaverLogin
