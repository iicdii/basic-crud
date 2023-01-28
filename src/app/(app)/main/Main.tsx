'use client'

import { Divider } from 'antd'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/boards/PostForm/PostForm'
import Posts from '@/components/boards/Posts/Posts'
import styles from './Main.module.css'

const Main = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <PostForm />
      <Divider />
      <Posts />
    </div>
  )
}

export default Main
