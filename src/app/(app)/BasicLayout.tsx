'use client'

import React from 'react'
import { Layout, Menu, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ACCESS_TOKEN_NAME } from '@/constants/constants'
import useUserInfo from '@/quries/users/useUserInfo'
import storage from '@/utils/storage'

const { Header, Content, Footer } = Layout

interface BasicLayoutProps {
  children?: React.ReactNode
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const router = useRouter()
  const { data } = useUserInfo((error) => {
    if (error.response?.status === 401) {
      message.error('세션이 만료되었습니다.')
      router.push('/')
    } else if (error.response?.status === 404) {
      message.error(error.response?.data.message)
      router.push('/')
    }
  })
  const handleLogout = () => {
    storage.removeItem(ACCESS_TOKEN_NAME)
    router.push('/')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/main">🏠</Link>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={[
            {
              key: 'user',
              label: data?.data?.email || '',
              children: [
                {
                  key: 'profile',
                  label: <Link href="/profile">내 정보</Link>,
                },
                {
                  key: 'logout',
                  label: <div onClick={handleLogout}>로그아웃</div>,
                },
              ],
            },
          ]}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0' }}>
          <Content style={{ padding: '0 24px' }}>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Copyright</Footer>
    </Layout>
  )
}

export default BasicLayout
