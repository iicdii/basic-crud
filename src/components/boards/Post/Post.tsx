import { Card, theme } from 'antd'
import Link from 'next/link'
import { Post as PostType } from '@/types/board'

interface PostProps {
  post: PostType | undefined
  link?: string
}

const { useToken } = theme

const Post = ({ post, link }: PostProps) => {
  const { token } = useToken()
  if (!post) return null

  return (
    <Card title={post.name} bordered={false}>
      {link ? (
        <Link href={link} style={{ color: token.colorText }}>
          {post.content}
        </Link>
      ) : (
        post.content
      )}
    </Card>
  )
}

export default Post
