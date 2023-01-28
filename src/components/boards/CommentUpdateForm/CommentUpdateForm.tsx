import { Button, Form, Input, message } from 'antd'
import { PatchCommentRequest } from '@/api/comments/comments'
import { COMMON_ERROR_MESSAGE } from '@/constants/error'
import useCommentUpdate from '@/quries/comments/useCommentUpdate'

const { TextArea } = Input

type CommentUpdateFormValues = PatchCommentRequest

interface CommentUpdateFormProps {
  commentId: string
  initialValue: string
  onSubmit?: () => void
  onCancel: () => void
}

const CommentUpdateForm = ({
  commentId,
  initialValue,
  onSubmit,
  onCancel,
}: CommentUpdateFormProps) => {
  const { mutate } = useCommentUpdate()
  const [form] = Form.useForm()

  const handleFinish = (values: CommentUpdateFormValues) => {
    const messageKey = 'submitting'
    message.loading({
      key: messageKey,
      content: '댓글 수정 중',
    })
    mutate(
      { ...values, commentId },
      {
        onSuccess: () => {
          message.destroy(messageKey)
          message.success('댓글 수정이 완료되었습니다.')
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
      initialValues={{ comment: initialValue }}
      onFinish={handleFinish}
      layout="inline"
      autoComplete="off"
      style={{ flex: 1, justifyContent: 'inherit' }}
    >
      <Form.Item
        name="comment"
        rules={[{ required: true, message: '내용을 입력해 주세요' }]}
        style={{ flex: 1 }}
      >
        <TextArea rows={2} />
      </Form.Item>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onCancel}>
            취소
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default CommentUpdateForm
