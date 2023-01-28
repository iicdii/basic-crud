import { Button, Form, Input, message } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
import { PostBoardRequest } from '@/api/boards/boards'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import { QUERY_KEY } from '@/constants/queryKey'
import usePostCreate from '@/queries/boards/usePostCreate'

const { TextArea } = Input

type PostFormValues = PostBoardRequest

const PostForm = () => {
  const queryClient = useQueryClient()
  const { mutate } = usePostCreate()
  const handleFinish = (values: PostFormValues) => {
    const messageKey = 'submitting'
    message.loading({
      key: messageKey,
      content: '게시글 업로드 중',
    })
    mutate(values, {
      onSuccess: () => {
        message.destroy(messageKey)
        message.success('게시글 업로드가 완료되었습니다.')
        queryClient.invalidateQueries([QUERY_KEY.getBoards])
      },
      onError: () => {
        message.destroy(messageKey)
        message.error(COMMON_ERROR_MESSAGE)
      },
    })
  }

  return (
    <Form
      name="post"
      initialValues={{}}
      onFinish={handleFinish}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="제목"
        name="name"
        rules={[{ required: true, message: '제목을 입력해 주세요' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="내용"
        name="content"
        rules={[{ required: true, message: '내용을 입력해 주세요' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          작성
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PostForm
