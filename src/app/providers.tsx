'use client'

import React, { useState } from 'react'
import { ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
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
        locale={koKR}
      >
        {children}
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default Providers
