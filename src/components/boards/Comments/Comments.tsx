import { Avatar, Button, List, Skeleton } from 'antd'
import useComments from '@/quries/comments/useComments'

const Comments = () => {
  const { data, isLoading } = useComments()

  const handleLoadMore = () => {}

  return (
    <>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        loadMore={
          !isLoading ? (
            <div>
              <Button onClick={handleLoadMore}>더 보기</Button>
            </div>
          ) : null
        }
        dataSource={data.data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={<Avatar />}
                title={<a href="https://ant.design">제목</a>}
              />
              <div>내용</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  )
}

export default Comments
