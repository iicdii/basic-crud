'use client'

import { Skeleton } from 'antd'
import { usePathname } from 'next/navigation'
import Post from '@/components/boards/Post/Post'
import CommentForm from '@/components/comments/CommentForm/CommentForm'
import Comments from '@/components/comments/Comments/Comments'
import usePost from '@/queries/boards/usePost'
import styles from './Board.module.css'

const Board = () => {
  const pathname = usePathname()
  const [, boardId] = pathname?.split('/board/') || []
  const { isLoading, data, refetch } = usePost(boardId)

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Post post={data?.data?.post} hasAction={true} onSubmit={refetch} />
      )}
      <div className={styles.comments}>
        <Comments initialData={data?.data?.comment} onSubmit={refetch} />
      </div>
      <CommentForm boardId={boardId} onSubmit={refetch} />
    </div>
  )
}

export default Board
