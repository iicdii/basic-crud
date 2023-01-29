'use client'

import { Tabs, TabsProps } from 'antd'
import styles from 'src/app/(app)/profile/Profile.module.css'
import UserPosts from '@/components/boards/UserPosts/UserPosts'
import UserComments from '@/components/comments/UserComments/UserComments'
import UserInfo from '@/components/users/UserInfo/UserInfo'

const Profile = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `내 정보`,
      children: <UserInfo />,
    },
    {
      key: '2',
      label: `내가 쓴 글`,
      children: <UserPosts />,
    },
    {
      key: '3',
      label: `내가 쓴 댓글`,
      children: <UserComments />,
    },
  ]

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default Profile
