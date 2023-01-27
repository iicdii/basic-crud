'use client'

import React, { useState } from 'react'
import { ConfigProvider } from 'antd'
import { QueryClientProvider } from '@tanstack/react-query'
import getQueryClient from '@/utils/getQueryClient'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorBgLayout: '#efefef',
            fontFamily: '',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default Providers
