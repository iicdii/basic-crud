'use client'

import { Button, Divider, Form, Input, message } from 'antd'
import styles from 'src/components/SignUpForm/SignUpForm.module.css'
import { PostUserSignUpRequest } from '@/api/users/users'
import NaverLogin from '@/components/NaverLogin/NaverLogin'
import { ACCESS_TOKEN_NAME } from '@/constants/constants'
import useSignUp from '@/quries/users/useSignUp'
import storage from '@/utils/storage'

type SignUpFormValues = PostUserSignUpRequest

const SignUpForm = () => {
  const { mutate } = useSignUp()

  const handleFinish = (values: SignUpFormValues) => {
    const msgKey = 'submitting'
    message.loading({ key: msgKey, content: '회원가입 중' })
    mutate(values, {
      onSuccess: (res) => {
        message.destroy(msgKey)
        message.info('회원가입 성공')
        storage.setItem(ACCESS_TOKEN_NAME, res.data.token)
      },
      onError: (error) => {
        message.destroy(msgKey)
        const { data } = error.response || {}
        if ((data?.statusCode || 0) === 400) {
          if (Array.isArray(data?.message)) {
            message.error(data?.message.pop())
          } else {
            message.error(data?.message)
          }
        } else {
          message.error('오류가 발생하였습니다. 잠시 후 다시 시도해주세요.')
        }
      },
    })
  }

  return (
    <Form
      name="sign-up"
      className={styles.form}
      labelCol={{ span: 24 }}
      initialValues={{}}
      onFinish={handleFinish}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="이메일"
        name="email"
        rules={[
          { required: true, message: '이메일을 입력해 주세요.', type: 'email' },
        ]}
      >
        <Input />
      </Form.Item>

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
          회원가입
        </Button>
      </Form.Item>

      <Divider>또는</Divider>

      <div className={styles.socialLogin}>
        <NaverLogin />
      </div>
    </Form>
  )
}

export default SignUpForm
