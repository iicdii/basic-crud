'use client'

import { Divider } from 'antd'
import PostForm from '@/components/boards/PostForm/PostForm'
import Posts from '@/components/boards/Posts/Posts'
import styles from './Main.module.css'

const Main = () => {
  return (
    <div className={styles.container}>
      <PostForm />
      <Divider />
      <Posts />
    </div>
  )
}

export default Main
