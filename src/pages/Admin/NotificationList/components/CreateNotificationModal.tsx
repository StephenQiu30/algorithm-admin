import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { MarkdownEditor } from '@/components';
import React from 'react';
import { addNotification } from '@/services/notification/notificationController';
import { message } from 'antd';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => void;
}

const CreateNotificationModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const [form] = ProForm.useForm<API.NotificationAddRequest>();

  return (
    <ModalForm<API.NotificationAddRequest>
      title="创建系统通知"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await addNotification({
            ...values,
            target: 'all',
          });
          if (res.code === 0) {
            message.success('通知发送成功');
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
          submitText: '创建',
          resetText: '取消',
        },
      }}
    >
      <ProFormText
        name="title"
        label="通知标题"
        placeholder="请输入跨系统广播的标题"
        rules={[{ required: true, message: '请输入标题' }]}
      />
      <ProForm.Item
        name="content"
        label="通知内容"
        rules={[{ required: true, message: '请输入内容' }]}
      >
        <MarkdownEditor />
      </ProForm.Item>
    </ModalForm>
  );
};
export default CreateNotificationModal;
