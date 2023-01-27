'use client'

import { message, Typography } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm/LoginForm'
import { ACCESS_TOKEN_NAME, NAVER_TOKEN_NAME } from '@/constants/constants'
import useSocialLogin from '@/quries/users/useSocialLogin'
import useSocialSignUp from '@/quries/users/useSocialSignUp'
import { RequestError } from '@/types/error'
import { NaverUserInfo } from '@/types/user'
import storage from '@/utils/storage'
import styles from './Home.module.css'

const { Title } = Typography

const Home = () => {
  const socialLogin = useSocialLogin()
  const socialSignUp = useSocialSignUp()
  const router = useRouter()

  const handleNaverLogin = async (user: NaverUserInfo) => {
    const [, accessToken] = window.location.hash.split('=')
    if (!accessToken) return
    storage.setItem(NAVER_TOKEN_NAME, accessToken)

    // 소셜 로그인 시도
    // 로그인 실패 시 소셜 회원가입 시도
    // 실패 시 에러 메세지 출력
    try {
      await socialLogin.mutateAsync({
        socialPlatform: 'naver',
        token: accessToken,
      })
      return
    } catch (e: unknown) {
      if (e instanceof AxiosError<RequestError>) {
        if ((e.response?.status || 0) >= 500) {
          message.error(
            '서버와의 연결에 실패했습니다. 잠시 후 다시 시도해주세요.'
          )
        }
      }
    }

    if (!user.email) {
      message.error('사용자 이메일을 받아오는 데 실패했습니다.')
      return
    }
    const [username] = user.email.split('@')

    try {
      const res = await socialSignUp.mutateAsync({
        socialPlatform: 'naver',
        token: accessToken,
        username,
      })
      storage.setItem(ACCESS_TOKEN_NAME, res.data.token)
      router.push('/main')
    } catch (e: unknown) {
      if (e instanceof AxiosError<RequestError>) {
        if ((e.response?.status || 0) >= 500) {
          message.error(
            '서버와의 연결에 실패했습니다. 잠시 후 다시 시도해주세요.'
          )
        } else {
          message.error('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.')
        }
      }
    }
  }

  return (
    <div className={styles.loginForm}>
      <div className={styles.title}>
        <Title level={2}>로그인</Title>
      </div>
      <LoginForm onGetNaverUserInfo={handleNaverLogin} />
    </div>
  )
}

export default Home
