import { message } from 'antd';
import React from 'react';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { MarkdownEditor } from '@/components';
import { updatePost } from '@/services/post/postController';

interface Props {
  oldData?: API.PostVO;
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => void;
}

/**
 * 更新算法知识弹窗
 * @param props
 * @constructor
 */
const UpdateKnowledgeModal: React.FC<Props> = (props) => {
  const { oldData, visible, onCancel, onSubmit } = props;
  const [form] = ProForm.useForm<API.PostUpdateRequest>();

  // 当 oldData 改变时重置表单
  React.useEffect(() => {
    if (visible && oldData) {
      const tags = typeof oldData.tags === 'string' ? JSON.parse(oldData.tags || '[]') : oldData.tags || [];
      form.setFieldsValue({
        ...oldData,
        tags,
      } as any);
    }
  }, [visible, oldData, form]);

  return (
    <ModalForm<API.PostUpdateRequest>
      title="更新算法知识"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await updatePost({
            ...values,
            id: oldData?.id,
            contentType: 1,
          } as any);
          if (res.code === 0) {
            message.success('更新成功');
            onSubmit?.();
            return true;
          } else {
            message.error(`更新失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`更新报错: ${error.message}`);
        }
        return false;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitter={{
        searchConfig: {
          submitText: '更新',
          resetText: '取消',
        },
      }}
    >
      <ProFormText
        name="title"
        label="标题"
        rules={[{ required: true, message: '请输入标题' }]}
        placeholder="请输入标题"
      />
      <ProForm.Item name="content" label="内容" rules={[{ required: true, message: '请输入内容' }]}>
        <MarkdownEditor />
      </ProForm.Item>
      <ProFormSelect
        name="tags"
        label="标签"
        mode="tags"
        placeholder="请输入标签"
        fieldProps={{
          suffixIcon: null,
        }}
      />
    </ModalForm>
  );
};

export default UpdateKnowledgeModal;
