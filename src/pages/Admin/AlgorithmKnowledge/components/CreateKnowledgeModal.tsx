import { message } from 'antd';
import React from 'react';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { MarkdownEditor } from '@/components';
import { add } from '@/services/post/algorithmKnowledgeController';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => void;
}

/**
 * 新建算法知识弹窗
 * @param props
 * @constructor
 */
const CreateKnowledgeModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const [form] = ProForm.useForm<API.PostAddRequest>();

  return (
    <ModalForm<API.PostAddRequest>
      title="新建算法知识"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await add({
            ...values,
          });
          if (res.code === 0) {
            message.success('创建成功');
            onSubmit?.();
            return true;
          } else {
            message.error(`创建失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`创建报错: ${error.message}`);
        }
        return false;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitter={{
        searchConfig: {
          submitText: '新建',
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
export default CreateKnowledgeModal;
