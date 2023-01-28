import React from 'react'
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
          <div>
            {post.content.split('\n').map((n, i) => (
              <React.Fragment key={i}>
                {n}
                <br />
              </React.Fragment>
            ))}
          </div>
        </Link>
      ) : (
        post.content.split('\n').map((n, i) => (
          <React.Fragment key={i}>
            {n}
            <br />
          </React.Fragment>
        ))
      )}
    </Card>
  )
}

export default Post
