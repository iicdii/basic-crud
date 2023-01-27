import axiosClient from '@/utils/axiosClient'

// 게시글 작성
export interface PostBoard {
  name: string
  content: string
}

export const postBoard = (data: PostBoard) => {
  return axiosClient.post('/boards', data)
}

// 게시판 조회
export interface GetBoards {
  skip: number
  take: number
}

export const getBoards = (params: GetBoards) => {
  return axiosClient.get('/boards', {
    params,
  })
}

// 유저가 쓴 글 조회
export interface GetUserPosts {
  skip: number
  take: number
}

export const getUserPosts = (params: GetUserPosts) => {
  return axiosClient.get('/boards/user/posts', {
    params,
  })
}

// 게시글 조회
export const getBoard = (boardId: string) => {
  return axiosClient.get(`/boards/${boardId}`)
}

// 게시글 수정
export interface PatchBoard {
  name: string
  content: string
}

export const patchBoard = (boardId: string, data: PatchBoard) => {
  return axiosClient.patch(`/boards/${boardId}`, data)
}

// 게시글 삭제
export const deleteBoard = (boardId: string) => {
  return axiosClient.delete(`/boards/${boardId}`)
}
