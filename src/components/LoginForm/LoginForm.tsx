'use client'

import { Button, Divider, Form, Input, Typography, message } from 'antd'
import Link from 'next/link'
import { PostUserSignInRequest } from '@/api/users/users'
import NaverLogin from '@/components/NaverLogin/NaverLogin'
import useSignIn from '@/hooks/quries/users/useSignIn'
import styles from './LoginForm.module.css'

type LoginForm = PostUserSignInRequest

const { Text } = Typography

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const LoginForm = () => {
  const { mutate } = useSignIn()

  const handleFinish = (values: LoginForm) => {
    const msgKey = 'submitting'
    message.loading({ key: msgKey, content: '로그인 중' })
    mutate(values, {
      onSuccess: () => {
        message.destroy(msgKey)
        message.info('로그인 성공')
      },
      onError: (error) => {
        message.destroy(msgKey)
        if ((error.response?.data?.statusCode || 0) === 400) {
          message.error('아이디 또는 비밀번호가 일치하지 않습니다.')
        } else {
          message.error(
            '로그인 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.'
          )
        }
      },
    })
  }

  return (
    <Form
      name="basic"
      className={styles.form}
      labelCol={{ span: 24 }}
      initialValues={{}}
      onFinish={handleFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="아이디"
        name="username"
        rules={[{ required: true, message: '아이디를 입력해 주세요.' }]}
      >
        <Input className={styles.field} />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해 주세요.' }]}
        className={styles.field}
      >
        <Input.Password className={styles.field} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }} className={styles.loginButton}>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>

      <Divider>또는</Divider>

      <div className={styles.socialLogin}>
        <NaverLogin />
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
