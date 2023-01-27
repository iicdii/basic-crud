'use client'

import React from 'react'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

interface BasicLayoutProps {
  children?: React.ReactNode
}

const BasicLayout = (props: BasicLayoutProps) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div>🏠</div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 200 }}>
            Content
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Copyright</Footer>
    </Layout>
  )
}

export default BasicLayout
