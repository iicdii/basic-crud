'use client'

import { Typography } from 'antd'
import LoginForm from '@/components/LoginForm/LoginForm'
import styles from './Home.module.css'

const { Title } = Typography

const Home = () => {
  return (
    <div className={styles.loginForm}>
      <div className={styles.title}>
        <Title level={2}>로그인</Title>
      </div>
      <LoginForm />
    </div>
  )
}

export default Home
