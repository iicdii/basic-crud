import { Card } from 'antd'
import { GetBoardsResponse } from '@/api/boards/boards'

interface PostProps {
  post: GetBoardsResponse['data']
}

const Post = ({ post }: PostProps) => {
  return (
    <Card title={post.name} bordered={false}>
      {post.content}
    </Card>
  )
}

export default Post
