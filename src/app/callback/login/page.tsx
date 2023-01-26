'use client'

import { useEffect } from 'react'
import { Spin } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'

export default function LoginCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const [, accessToken] = window.location.hash.split('=')
    if (!accessToken) return

    try {
      localStorage.setItem('token', accessToken)
    } catch (e) {
      // ignore
    } finally {
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      router.push('/')
    }
  }, [router, searchParams])

  return (
    <>
      <main className={styles.main}>
        <Spin />
      </main>
    </>
  )
}
