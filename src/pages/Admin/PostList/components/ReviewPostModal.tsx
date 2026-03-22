import { ModalForm, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { reviewPost } from '@/services/post/postController';
import { ReviewStatusEnum } from '@/enums/ReviewStatusEnum';

interface Props {
  oldData?: API.PostVO;
  onCancel: () => void;
  onSubmit: (values?: API.PostReviewRequest) => void;
  visible: boolean;
}

/**
 * 审核帖子弹窗
 * @param props
 * @constructor
 */
const ReviewPostModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;

  if (!oldData) {
    return null;
  }

  return (
    <ModalForm<API.PostReviewRequest>
      title={'审核帖子'}
      open={visible}
      onFinish={async (values: API.PostReviewRequest) => {
        try {
          const res = await reviewPost({
            ...values,
            id: oldData.id,
          });
          if (res.code === 0 && res.data) {
            message.success('审核成功');
            onSubmit?.(values);
            return true;
          }
        } catch (error: any) {
          message.error(`审核失败: ${error.message}`);
        }
        return false;
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

export default ReviewPostModal;
