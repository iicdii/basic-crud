import { ACCESS_TOKEN_NAME } from '@/constants/constants'
import { Post, Comment } from '@/types/board'
import axiosClient from '@/utils/axiosClient'
import storage from '@/utils/storage'

axiosClient.defaults.headers.common[
  'Authorization'
] = `Bearer ${storage.getItem(ACCESS_TOKEN_NAME)}`

// 게시글 작성
export interface PostBoardRequest {
  name: string
  content: string
}

export const postBoard = (data: PostBoardRequest) => {
  return axiosClient.post('/boards', data)
}

// 게시판 조회
export interface GetBoardsParams {
  skip: number
  take: number
}

export interface GetBoardsResponse {
  data: Post[]
  message: string
}

export const getBoards = (params: GetBoardsParams = { skip: 0, take: 5 }) => {
  return axiosClient.get<GetBoardsResponse>('/boards', {
    params,
  })
}

// 유저가 쓴 글 조회
export interface GetUserPostsParams {
  skip: number
  take: number
}

export const getUserPosts = (params: GetUserPostsParams) => {
  return axiosClient.get<GetBoardsResponse>('/boards/user/posts', {
    params,
  })
}

// 게시글 조회
export interface GetBoardResponse {
  data: {
    post: Post
    comment: Omit<Comment, 'boardsId'>[]
  }
  message: string
}

export const getBoard = (boardId: string) => {
  return axiosClient.get<GetBoardResponse>(`/boards/${boardId}`)
}

// 게시글 수정
export interface PatchBoardRequest {
  boardId: string
  name: string
  content: string
}

export const patchBoard = ({ boardId, ...data }: PatchBoardRequest) => {
  return axiosClient.patch(`/boards/${boardId}`, data)
}

// 게시글 삭제
export const deleteBoard = (boardId: string) => {
  return axiosClient.delete(`/boards/${boardId}`)
}
