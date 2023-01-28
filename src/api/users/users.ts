import { ACCESS_TOKEN_NAME } from '@/constants/constants'
import axiosClient from '@/utils/axiosClient'
import storage from '@/utils/storage'

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
  return axiosClient.get<GetUserInfoResponse>('/users/userInfo', {
    headers: {
      Authorization: `Bearer ${storage.getItem(ACCESS_TOKEN_NAME)}`,
    },
  })
}

// 유저 업데이트
export interface PatchUserRequest {
  email: string
  password?: string
  username: string
}

export const patchUser = (data: PatchUserRequest) => {
  return axiosClient.patch('/users', data, {
    headers: {
      Authorization: `Bearer ${storage.getItem(ACCESS_TOKEN_NAME)}`,
    },
  })
}

// 유저 삭제
export interface DeleteUserResponse {
  data: {
    raw: []
    affected: boolean
  }
  message: string
}

export const deleteUser = () => {
  return axiosClient.delete<DeleteUserResponse>('/users', {
    headers: {
      Authorization: `Bearer ${storage.getItem(ACCESS_TOKEN_NAME)}`,
    },
  })
}
