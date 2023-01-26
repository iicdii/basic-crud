'use client'

import React from 'react'
import { ConfigProvider } from 'antd'

interface AntdProviderProps {
  children: React.ReactNode
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdProvider
