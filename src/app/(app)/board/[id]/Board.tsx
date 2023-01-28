'use client'

import { Skeleton } from 'antd'
import { usePathname } from 'next/navigation'
import CommentForm from '@/components/boards/CommentForm/CommentForm'
import Comments from '@/components/boards/Comments/Comments'
import Post from '@/components/boards/Post/Post'
import usePost from '@/quries/boards/usePost'
import styles from './Board.module.css'

const Board = () => {
  const pathname = usePathname()
  const [, boardId] = pathname?.split('/board/') || []
  const { isLoading, data, refetch } = usePost(boardId)
  const handleCommentSubmit = () => {
    refetch()
  }
  const handleCommentDeleteSubmit = () => {
    refetch()
  }

  return (
    <div className={styles.container}>
      {isLoading ? <Skeleton /> : <Post post={data?.data?.post} />}
      <div className={styles.comments}>
        <Comments
          initialData={data?.data?.comment}
          onSubmit={handleCommentDeleteSubmit}
        />
      </div>
      <CommentForm boardId={boardId} onSubmit={handleCommentSubmit} />
    </div>
  )
}

export default Board
