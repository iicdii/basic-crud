import { Button, Form, Input, message } from 'antd'
import { PostBoardRequest } from '@/api/boards/boards'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import usePostBoard from '@/quries/boards/usePostBoard'

const { TextArea } = Input

type PostFormValues = PostBoardRequest

const PostForm = () => {
  const { mutate } = usePostBoard()
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
