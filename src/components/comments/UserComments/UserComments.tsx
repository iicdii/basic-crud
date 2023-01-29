import React, { useState } from 'react'
import { Button, Card, List, message, Modal, Skeleton, Space } from 'antd'
import { GetUserCommentsParams } from '@/api/comments/comments'
import CommentUpdateForm from '@/components/comments/CommentUpdateForm/CommentUpdateForm'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useCommentDelete from '@/queries/comments/useCommentDelete'
import useUserComments from '@/queries/comments/useUserComments'
import styles from './UserComments.module.css'

const UserComments = () => {
  const [params, setParams] = useState<GetUserCommentsParams>({
    skip: 0,
    take: 5,
  })
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [editId, setEditId] = useState<string>()
  const { data, isLoading, refetch } = useUserComments(params)
  const commentDelete = useCommentDelete()

  const hasPrev = params.skip >= params.take
  const hasMore = (data?.data?.length || 0) >= params.take

  const handlePrev = () => {
    setParams({
      skip: Math.max(params.skip - params.take, 0),
      take: params.take,
    })
  }

  const handleNext = () => {
    setParams({ skip: params.skip + params.take, take: params.take })
  }

  const handleDelete = (commentId: string) => {
    Modal.confirm({
      title: '정말 삭제하시겠습니까?',
      okText: '네',
      cancelText: '아니요',
      onOk() {
        commentDelete.mutate(commentId, {
          onSuccess: () => {
            message.success('삭제되었습니다.')
            refetch()
          },
          onError: () => message.error(COMMON_ERROR_MESSAGE),
        })
      },
    })
  }

  const handleCommentUpdate = () => {
    setMode('view')
    refetch()
  }

  return (
    <Card bordered={false} style={{ marginTop: 10 }}>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        loadMore={
          !isLoading && (
            <div className={styles.loadMore}>
              <Space>
                <Button onClick={handlePrev} disabled={!hasPrev}>
                  이전
                </Button>
                <Button onClick={handleNext} disabled={!hasMore}>
                  다음
                </Button>
              </Space>
            </div>
          )
        }
        locale={{ emptyText: '댓글이 없습니다.' }}
        dataSource={data?.data}
        renderItem={(item) => (
          <List.Item
            actions={
              mode === 'view'
                ? [
                    <Button
                      key="comment-update"
                      type="link"
                      onClick={() => {
                        setMode((state) => (state === 'view' ? 'edit' : 'view'))
                        setEditId(item.id)
                      }}
                    >
                      수정
                    </Button>,
                    <Button
                      key="comment-delete"
                      type="link"
                      danger
                      onClick={() => handleDelete(item.id)}
                    >
                      삭제
                    </Button>,
                  ]
                : undefined
            }
          >
            <Skeleton avatar title={false} loading={isLoading} active>
              {mode === 'edit' && editId === item.id ? (
                <CommentUpdateForm
                  commentId={item.id}
                  initialValue={item.comment}
                  onCancel={() => setMode('view')}
                  onSubmit={handleCommentUpdate}
                />
              ) : (
                <div>
                  {item.comment.split('\n').map((n, i) => (
                    <React.Fragment key={i}>
                      {n}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </Skeleton>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default UserComments
