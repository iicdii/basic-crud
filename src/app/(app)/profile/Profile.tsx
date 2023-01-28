'use client'

import { useState } from 'react'
import { Button, Card, List, message, Modal, Skeleton } from 'antd'
import { useRouter } from 'next/navigation'
import styles from 'src/app/(app)/profile/Profile.module.css'
import UserUpdateForm from '@/components/users/UserUpdateForm/UserUpdateForm'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useUserDelete from '@/queries/users/useUserDelete'
import useUserInfo from '@/queries/users/useUserInfo'

type ProfileMode = 'view' | 'edit'

const Profile = () => {
  const [mode, setMode] = useState<ProfileMode>('view')
  const router = useRouter()

  const { data, isLoading, refetch } = useUserInfo()
  const userDelete = useUserDelete()

  const handleWithdrawal = () => {
    Modal.confirm({
      title: '정말 탈퇴하시겠습니까?',
      okText: '네',
      okType: 'danger',
      cancelText: '아니요',
      onOk() {
        userDelete.mutate(undefined, {
          onSuccess: () => {
            message.success('탈퇴되었습니다.')
            router.push('/')
          },
          onError: () => message.error(COMMON_ERROR_MESSAGE),
        })
      },
    })
  }

  const handleUserUpdateSuccess = () => {
    refetch()
    setMode('view')
  }

  return (
    <div className={styles.container}>
      <Card
        title="내 정보"
        bordered={false}
        extra={
          <Button
            type="link"
            onClick={() =>
              setMode((state) => (state === 'view' ? 'edit' : 'view'))
            }
          >
            {mode === 'view' ? '수정' : '취소'}
          </Button>
        }
      >
        {mode === 'view' ? (
          <>
            <List
              loading={isLoading}
              itemLayout="horizontal"
              dataSource={[
                {
                  label: '아이디',
                  value: data?.data.username,
                },
                {
                  label: '이메일',
                  value: data?.data.email,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Skeleton avatar title={false} loading={isLoading} active>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.label}</a>}
                    />
                    <div>{item.value}</div>
                  </Skeleton>
                </List.Item>
              )}
            />
            <div className={styles.withdrawal}>
              <Button type="link" danger onClick={handleWithdrawal}>
                탈퇴
              </Button>
            </div>
          </>
        ) : (
          <UserUpdateForm
            initialValues={{
              email: data?.data.email || '',
              username: data?.data.username || '',
            }}
            hasPasswordField={!data?.data.socialPlatform}
            onSubmit={handleUserUpdateSuccess}
          />
        )}
      </Card>
    </div>
  )
}

export default Profile
