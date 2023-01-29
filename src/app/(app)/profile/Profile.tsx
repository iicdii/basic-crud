'use client'

import { Tabs, TabsProps } from 'antd'
import styles from 'src/app/(app)/profile/Profile.module.css'
import UserInfo from '@/components/users/UserInfo/UserInfo'
import UserPosts from '@/components/users/UserPosts/UserPosts'

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
  ]

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default Profile
