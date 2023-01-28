import { Button, Form, Input, message } from 'antd'
import { PostCommentRequest } from '@/api/comments/comments'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useCommentCreate from '@/quries/comments/useCommentCreate'

const { TextArea } = Input

type CommentFormValues = PostCommentRequest

interface CommentFormProps {
  boardId: string
  onSubmit?: () => void
}

const CommentForm = ({ boardId, onSubmit }: CommentFormProps) => {
  const { mutate } = useCommentCreate()
  const [form] = Form.useForm()

  const handleFinish = (values: CommentFormValues) => {
    const messageKey = 'submitting'
    message.loading({
      key: messageKey,
      content: '댓글 작성 중',
    })
    mutate(
      { ...values, boardId },
      {
        onSuccess: () => {
          message.destroy(messageKey)
          message.success('댓글 작성이 완료되었습니다.')
          form.resetFields()
          onSubmit?.()
        },
        onError: () => {
          message.destroy(messageKey)
          message.error(COMMON_ERROR_MESSAGE)
        },
      }
    )
  }

  return (
    <Form
      name="comment"
      form={form}
      initialValues={{}}
      onFinish={handleFinish}
      layout="inline"
      autoComplete="off"
      style={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Form.Item
        name="comment"
        rules={[{ required: true, message: '내용을 입력해 주세요' }]}
        style={{ flex: 1 }}
      >
        <TextArea placeholder="댓글을 남겨보세요" rows={2} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          작성
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CommentForm
