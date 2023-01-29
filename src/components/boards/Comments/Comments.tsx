import React, { useState } from 'react'
import { Button, Card, List, message, Modal, Skeleton } from 'antd'
import CommentUpdateForm from '@/components/boards/CommentUpdateForm/CommentUpdateForm'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useCommentDelete from '@/queries/comments/useCommentDelete'
import { Comment } from '@/types/board'
import styles from './Comments.module.css'

interface CommentsProps {
  initialData?: Omit<Comment, 'boardsId'>[]
  onSubmit?: () => void
}

const Comments = ({ initialData, onSubmit }: CommentsProps) => {
  // TODO - 댓글 조회 API 정상 작동하면 작업
  // const { data, isLoading } = useComments({ initialData })
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const commentDelete = useCommentDelete()
  const isLoading = false
  const data = initialData ? initialData : undefined

  const handleLoadMore = () => {}
  const handleDelete = (commentId: string) => {
    Modal.confirm({
      title: '정말 삭제하시겠습니까?',
      okText: '네',
      cancelText: '아니요',
      onOk() {
        commentDelete.mutate(commentId, {
          onSuccess: () => {
            message.success('삭제되었습니다.')
            onSubmit?.()
          },
          onError: () => message.error(COMMON_ERROR_MESSAGE),
        })
      },
    })
  }
  const handleCommentUpdate = () => {
    setMode('view')
    onSubmit?.()
  }

  return (
    <Card bordered={false} style={{ marginTop: 10 }}>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        loadMore={
          !isLoading && data?.length ? (
            <div className={styles.loadMore}>
              <Button onClick={handleLoadMore}>더 보기</Button>
            </div>
          ) : null
        }
        locale={{ emptyText: '댓글이 없습니다.' }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={
              mode === 'view'
                ? [
                    <Button
                      key="comment-update"
                      type="link"
                      onClick={() =>
                        setMode((state) => (state === 'view' ? 'edit' : 'view'))
                      }
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
              {mode === 'edit' ? (
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

export default Comments
