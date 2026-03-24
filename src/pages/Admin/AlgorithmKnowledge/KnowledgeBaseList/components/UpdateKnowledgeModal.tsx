import { message } from 'antd';
import React from 'react';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { updateKnowledgeBase } from '@/services/ai/knowledgeBaseController';
import { KnowledgeBaseStatusEnumMap } from '@/enums/KnowledgeBaseStatusEnum';

interface Props {
  oldData?: API.KnowledgeBaseVO;
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => void;
}

/**
 * 更新知识库弹窗
 * @param props
 * @constructor
 */
const UpdateKnowledgeModal: React.FC<Props> = (props) => {
  const { oldData, visible, onCancel, onSubmit } = props;
  const [form] = ProForm.useForm<API.KnowledgeBaseUpdateRequest>();

  // 当 oldData 改变时重置表单
  React.useEffect(() => {
    if (visible && oldData) {
      form.setFieldsValue({
        ...oldData,
      });
    }
  }, [visible, oldData, form]);

  return (
    <ModalForm<API.KnowledgeBaseUpdateRequest>
      title="更新算法知识库"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await updateKnowledgeBase({
            ...values,
            id: oldData?.id,
          });
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
        name="name"
        label="知识库名称"
        rules={[{ required: true, message: '请输入知识库名称' }]}
        placeholder="请输入知识库名称"
      />
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="请输入描述"
      />
      <ProFormSelect
        name="status"
        label="状态"
        options={Object.keys(KnowledgeBaseStatusEnumMap).map((key) => ({
          label: KnowledgeBaseStatusEnumMap[key as unknown as keyof typeof KnowledgeBaseStatusEnumMap].text,
          value: Number(key),
        }))}
      />
    </ModalForm>
  );
};

export default UpdateKnowledgeModal;
