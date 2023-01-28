'use client'

import { Button, Divider, Form, Input, Typography, message } from 'antd'
import Link from 'next/link'
import styles from 'src/components/users/LoginForm/LoginForm.module.css'
import { PostUserSignInRequest } from '@/api/users/users'
import NaverLogin from '@/components/users/NaverLogin/NaverLogin'
import { ACCESS_TOKEN_NAME } from '@/constants/constants'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useSignIn from '@/quries/users/useSignIn'
import { NaverUserInfo } from '@/types/user'
import storage from '@/utils/storage'

type LoginFormValues = PostUserSignInRequest

const { Text } = Typography

interface LoginFormProps {
  onGetNaverUserInfo: (user: NaverUserInfo) => void
}

const LoginForm = ({ onGetNaverUserInfo }: LoginFormProps) => {
  const { mutate } = useSignIn()

  const handleFinish = (values: LoginFormValues) => {
    const msgKey = 'submitting'
    message.loading({ key: msgKey, content: '로그인 중' })
    mutate(values, {
      onSuccess: (res) => {
        message.destroy(msgKey)
        message.info('로그인 성공')
        storage.setItem(ACCESS_TOKEN_NAME, res.data.token)
      },
      onError: (error) => {
        message.destroy(msgKey)
        if ((error.response?.status || 0) === 400) {
          message.error('아이디 또는 비밀번호가 일치하지 않습니다.')
        } else {
          message.error(COMMON_ERROR_MESSAGE)
        }
      },
    })
  }

  return (
    <Form
      name="login"
      className={styles.form}
      labelCol={{ span: 24 }}
      initialValues={{}}
      onFinish={handleFinish}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="아이디"
        name="username"
        rules={[{ required: true, message: '아이디를 입력해 주세요.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해 주세요.' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }} className={styles.loginButton}>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>

      <Divider>또는</Divider>

      <div className={styles.socialLogin}>
        <NaverLogin onGetNaverUserInfo={onGetNaverUserInfo} />
      </div>

      <div className={styles.signUp}>
        <Text>
          아직 회원이 아니신가요? <Link href="/signup">회원가입</Link>
        </Text>
      </div>
    </Form>
  )
}

export default LoginForm
