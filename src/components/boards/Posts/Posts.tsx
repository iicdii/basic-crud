import { useState } from 'react'
import { Button, Space } from 'antd'
import { GetBoardsParams } from '@/api/boards/boards'
import Post from '@/components/boards/Post/Post'
import usePosts from '@/quries/boards/usePosts'
import { Post as PostType } from '@/types/board'
import styles from './Posts.module.css'

const Posts = () => {
  const [params, setParams] = useState<GetBoardsParams>({ skip: 0, take: 5 })
  const { data, isLoading } = usePosts(params)

  if (isLoading) return null

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

  return (
    <>
      {data?.data?.map((post: PostType) => (
        <div className={styles.post} key={post.id}>
          <Post post={post} link={`/board/${post.id}`} />
        </div>
      ))}
      {!isLoading && (
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
      )}
    </>
  )
}

export default Posts
