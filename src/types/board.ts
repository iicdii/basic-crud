export interface Post {
  id: string
  content: string
  created_at: string
  name: string
  usersId: string
}

export interface Comment {
  id: string
  boardsId: string
  comment: string
  created_at: string
  usersId: string
}
