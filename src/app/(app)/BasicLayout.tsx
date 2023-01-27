'use client'

import React from 'react'
import { Layout, message } from 'antd'
import { useRouter } from 'next/navigation'
import useUserInfo from '@/quries/users/useUserInfo'

const { Header, Content, Footer } = Layout

interface BasicLayoutProps {
  children?: React.ReactNode
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const router = useRouter()
  useUserInfo((error) => {
    if (error.response?.status === 401) {
      message.error('세션이 만료되었습니다.')
      router.push('/')
    }
  })

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div>🏠</div>
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
