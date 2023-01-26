import axiosClient from '@/utils/axiosClient'

// 유저 회원가입
export interface PostUserSignUpRequest {
  email: string
  password: string
  username: string
}

export interface PostUserSignUpResponse {
  data: {
    token: string
  }
  message: string
}

export const postUserSignUp = (data: PostUserSignUpRequest) => {
  return axiosClient.post<PostUserSignUpResponse>('/users/signup', data)
}

// 유저 로그인
export interface PostUserSignInRequest {
  email: string
  password: string
}

export interface PostUserSignInResponse {
  data: {
    token: string
  }
  message: string
}

export const postUserSignIn = (data: PostUserSignInRequest) => {
  return axiosClient.post<PostUserSignInResponse>('/users/signin', data)
}

// 유저 소셜 로그인
export interface PostUserSocialLogInRequest {
  socialPlatform: 'naver'
  token: string
}

export interface PostUserSocialLogInResponse {
  data: {
    token: string
  }
  message: string
}

export const postUserSocialLogIn = (data: PostUserSocialLogInRequest) => {
  return axiosClient.post<PostUserSocialLogInResponse>(
    '/users/signin/socialLogin',
    data
  )
}

// 유저 소셜 회원가입
export interface PostUserSocialSignUpRequest {
  socialPlatform: 'naver'
  token: string
  username: string
}

export interface PostUserSocialSignUpResponse {
  data: {
    token: string
  }
  message: string
}

export const postUserSocialSignUp = (data: PostUserSocialSignUpRequest) => {
  return axiosClient.post<PostUserSocialSignUpResponse>(
    '/users/signup/socialLogin',
    data
  )
}

// 유저 정보 조회
export interface GetUserInfoResponse {
  data: {
    id: string
    email: string
    username: string
    socialPlatform: string
    created_at: string
  }
  message: string
}

export const getUserInfo = () => {
  return axiosClient.get<GetUserInfoResponse>('/users/userInfo')
}
