'use client'

import { Divider } from 'antd'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/boards/PostForm/PostForm'
import Posts from '@/components/boards/Posts/Posts'

const Main = () => {
  const router = useRouter()

  return (
    <>
      <PostForm />
      <Divider />
      <Posts />
    </>
  )
}

export default Main
