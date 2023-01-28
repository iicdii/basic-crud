'use client'

import { Button, Form, Input, message } from 'antd'
import { PatchUserRequest } from '@/api/users/users'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useUserUpdate from '@/quries/users/useUserUpdate'
import styles from './UserUpdateForm.module.css'

interface UserUpdateFormValues {
  email: string
  password?: string
  username: string
}

interface UserUpdateFormProps {
  initialValues: { email: string; username: string }
  hasPasswordField?: boolean
  onSubmit?: () => void
}

const UserUpdateForm = ({
  initialValues,
  hasPasswordField = true,
  onSubmit,
}: UserUpdateFormProps) => {
  const { mutate } = useUserUpdate()

  const handleFinish = (values: UserUpdateFormValues) => {
    const msgKey = 'submitting'
    message.loading({ key: msgKey, content: '회원정보 수정 중' })
    mutate(
      { email: values.email, username: values.username },
      {
        onSuccess: (res) => {
          message.destroy(msgKey)
          message.info('회원정보 수정 완료')
          onSubmit?.()
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
            message.error(COMMON_ERROR_MESSAGE)
          }
        },
      }
    )
  }

  return (
    <Form
      name="user-update"
      className={styles.form}
      labelCol={{ span: 24 }}
      initialValues={initialValues}
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

      {hasPasswordField ? (
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ message: '비밀번호를 입력해 주세요.' }]}
        >
          <Input.Password />
        </Form.Item>
      ) : null}

      <Form.Item wrapperCol={{ span: 24 }} className={styles.updateButton}>
        <Button type="primary" htmlType="submit">
          수정
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserUpdateForm
