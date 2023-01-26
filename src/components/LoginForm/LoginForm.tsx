'use client'

import { Button, Divider, Form, Input, Typography } from 'antd'
import Link from 'next/link'
import NaverLogin from '@/components/NaverLogin/NaverLogin'
import styles from './LoginForm.module.css'

const { Text } = Typography

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const LoginForm = () => {
  return (
    <Form
      name="basic"
      className={styles.form}
      labelCol={{ span: 24 }}
      initialValues={{}}
      onFinish={onFinish}
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
