'use client'

import { Typography } from 'antd'
import SignUpForm from '@/components/users/SignUpForm/SignUpForm'
import styles from './SignUp.module.css'

const { Title } = Typography

const SignUp = () => {
  return (
    <div className={styles.signUpForm}>
      <div className={styles.title}>
        <Title level={2}>회원가입</Title>
      </div>
      <SignUpForm />
    </div>
  )
}

export default SignUp
