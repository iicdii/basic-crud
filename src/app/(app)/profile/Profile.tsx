'use client'

import { Button, Card, List, message, Modal, Skeleton } from 'antd'
import { useRouter } from 'next/navigation'
import styles from 'src/app/(app)/profile/Profile.module.css'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useUserDelete from '@/quries/users/useUserDelete'
import useUserInfo from '@/quries/users/useUserInfo'
import useUserUpdate from '@/quries/users/useUserUpdate'

const Profile = () => {
  const router = useRouter()
  const { data, isLoading } = useUserInfo()
  const userDelete = useUserDelete()
  const userUpdate = useUserUpdate()

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

  return (
    <div className={styles.container}>
      <Card title="내 정보" bordered={false}>
        <List
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={[
            {
              label: '사용자명',
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
      </Card>
    </div>
  )
}

export default Profile
