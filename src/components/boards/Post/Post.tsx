import React, { useState } from 'react'
import { Button, Card, Form, Input, message, Modal, theme } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PatchBoardRequest } from '@/api/boards/boards'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import usePostDelete from '@/queries/boards/usePostDelete'
import usePostUpdate from '@/queries/boards/usePostUpdate'
import { Post as PostType } from '@/types/board'

interface PostProps {
  post: PostType | undefined
  hasAction?: boolean
  link?: string
  onSubmit?: () => void
}

type PostUpdateFormValues = PatchBoardRequest

const { useToken } = theme
const { TextArea } = Input

const Post = ({ post, link, hasAction, onSubmit }: PostProps) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const router = useRouter()
  const postDelete = usePostDelete()
  const postUpdate = usePostUpdate()
  const { token } = useToken()
  if (!post) return null

  const handleFinish = (values: PostUpdateFormValues) => {
    const messageKey = 'submitting'
    message.loading({
      key: messageKey,
      content: '게시글 수정 중',
    })
    postUpdate.mutate(
      { ...values, boardId: post.id },
      {
        onSuccess: () => {
          message.destroy(messageKey)
          message.success('게시글 수정이 완료되었습니다.')
          setMode('view')
          onSubmit?.()
        },
        onError: () => {
          message.destroy(messageKey)
          message.error(COMMON_ERROR_MESSAGE)
        },
      }
    )
  }

  const handleDelete = () => {
    Modal.confirm({
      title: '정말 삭제하시겠습니까?',
      okText: '네',
      cancelText: '아니요',
      onOk() {
        postDelete.mutate(post.id, {
          onSuccess: () => {
            message.success('삭제되었습니다.')
            router.push('/main')
          },
          onError: () => message.error(COMMON_ERROR_MESSAGE),
        })
      },
    })
  }

  return (
    <Form
      name="post"
      initialValues={{ name: post.name, content: post.content }}
      onFinish={handleFinish}
      layout="vertical"
      autoComplete="off"
    >
      <Card
        title={
          mode === 'view' ? (
            post.name
          ) : (
            <Form.Item
              name="name"
              rules={[{ required: true, message: '제목을 입력해 주세요' }]}
              style={{ margin: 0 }}
            >
              <Input />
            </Form.Item>
          )
        }
        bordered={false}
        extra={
          hasAction && (
            <>
              {mode === 'view' ? (
                <Button type="link" onClick={() => setMode('edit')}>
                  수정
                </Button>
              ) : (
                <>
                  <Button type="link" htmlType="submit">
                    발행
                  </Button>
                  <Button type="link" onClick={() => setMode('view')}>
                    취소
                  </Button>
                </>
              )}
              <Button type="link" danger onClick={handleDelete}>
                삭제
              </Button>
            </>
          )
        }
      >
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
        ) : mode === 'view' ? (
          post.content.split('\n').map((n, i) => (
            <React.Fragment key={i}>
              {n}
              <br />
            </React.Fragment>
          ))
        ) : (
          <Form.Item
            name="content"
            rules={[{ required: true, message: '내용을 입력해 주세요' }]}
            style={{ margin: 0 }}
          >
            <TextArea rows={4} />
          </Form.Item>
        )}
      </Card>
    </Form>
  )
}

export default Post
