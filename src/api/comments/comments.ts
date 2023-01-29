import { Comment } from '@/types/comment'
import axiosClient from '@/utils/axiosClient'

// 코멘트 작성
export interface PostCommentRequest {
  boardId: string
  comment: string
}

export const postComment = (data: PostCommentRequest) => {
  return axiosClient.post('/comments', data)
}

// 코멘트 조회
export interface GetCommentsParams {
  skip: number
  take: number
}

export interface GetCommentsResponse {
  data: Comment[]
  message: string
}

export const getComments = (
  params: GetCommentsParams = { skip: 0, take: 5 }
) => {
  return axiosClient.get<GetCommentsResponse>('/comments', {
    params,
  })
}

// 유저가 쓴 코멘트 조회
export interface GetUserCommentsParams {
  skip: number
  take: number
}

export const getUserComments = (params: GetUserCommentsParams) => {
  return axiosClient.get('/comments/user/comments', {
    params,
  })
}

export interface GetComment {
  data: Comment
  message: string
}

// 코멘트 조회
export const getComment = (commentId: string) => {
  return axiosClient.get(`/comments/${commentId}`)
}

// 코멘트 수정
export interface PatchCommentRequest {
  commentId: string
  comment: string
}

export const patchComment = ({ commentId, ...data }: PatchCommentRequest) => {
  return axiosClient.patch(`/comments/${commentId}`, data)
}

// 코멘트 삭제
export const deleteComment = (commentId: string) => {
  return axiosClient.delete(`/comments/${commentId}`)
}
