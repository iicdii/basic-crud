import axiosClient from '@/utils/axiosClient'

// 코멘트 작성
export interface PostComment {
  boardId: string
  comment: string
}

export const postComment = (data: PostComment) => {
  return axiosClient.post('/comments', data)
}

// 코멘트 조회
export interface GetComments {
  skip: number
  take: number
}

export const getComments = (params: GetComments) => {
  return axiosClient.get('/comments', {
    params,
  })
}

// 유저가 쓴 코멘트 조회
export interface GetUserComments {
  skip: number
  take: number
}

export const getUserComments = (params: GetUserComments) => {
  return axiosClient.get('/comments/user/comments', {
    params,
  })
}

// 코멘트 조회
export const getComment = (commentId: string) => {
  return axiosClient.get(`/comments/${commentId}`)
}

// 코멘트 수정
export interface PatchComment {
  comment: string
}

export const patchComment = (commentId: string, data: PatchComment) => {
  return axiosClient.patch(`/comments/${commentId}`, data)
}

// 코멘트 삭제
export const deleteComment = (commentId: string) => {
  return axiosClient.delete(`/comments/${commentId}`)
}
