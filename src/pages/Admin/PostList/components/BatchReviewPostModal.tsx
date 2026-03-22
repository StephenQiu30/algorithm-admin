import { ModalForm, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { reviewPost } from '@/services/post/postController';
import { ReviewStatusEnum } from '@/enums/ReviewStatusEnum';

interface Props {
  posts: API.PostVO[];
  onCancel: () => void;
  onSubmit: () => void;
  visible: boolean;
}

const BatchReviewPostModal: React.FC<Props> = (props) => {
  const { posts, visible, onSubmit, onCancel } = props;

  return (
    <ModalForm<{ reviewStatus: number; reviewMessage: string }>
      title={`批量审核帖子 (共 ${posts.length} 条)`}
      open={visible}
      onFinish={async (values) => {
        const hide = message.loading('正在批量审核');
        try {
          await Promise.all(
            posts.map((post) =>
              reviewPost({
                id: post.id,
                reviewStatus: values.reviewStatus,
                reviewMessage: values.reviewMessage,
              }),
            ),
          );
          message.success('批量审核成功');
          await onSubmit?.();
          return true;
        } catch (error: any) {
          message.error(`批量审核失败: ${error.message}`);
          return false;
        } finally {
          hide();
        }
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
    >
      <ProFormRadio.Group
        name="reviewStatus"
        label="审核状态"
        rules={[{ required: true, message: '请选择审核状态' }]}
        options={[
          {
            label: '通过',
            value: ReviewStatusEnum.PASS,
          },
          {
            label: '拒绝',
            value: ReviewStatusEnum.REJECT,
          },
        ]}
      />
      <ProFormTextArea
        name="reviewMessage"
        label="审核信息"
        placeholder="请输入审核信息"
        rules={[{ required: true, message: '请输入审核信息' }]}
      />
    </ModalForm>
  );
};

export default BatchReviewPostModal;
