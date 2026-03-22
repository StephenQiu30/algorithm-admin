import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { MarkdownEditor } from '@/components';
import { message, UploadProps } from 'antd';
import React, { useState } from 'react';

import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { updatePost } from '@/services/post/postController';
import { uploadFile } from '@/services/file/fileController';

interface Props {
  oldData?: API.PostVO;
  onCancel: () => void;
  onSubmit: (values?: API.PostUpdateRequest) => void;
  visible: boolean;
}

const UpdatePostModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [cover, setCover] = useState<string>();
  const [form] = ProForm.useForm<API.PostUpdateRequest>();

  // Reset form when modal opens
  React.useEffect(() => {
    if (visible && oldData) {
      let tags: string[] = [];
      if (Array.isArray(oldData.tags)) {
        tags = oldData.tags;
      } else if (typeof oldData.tags === 'string') {
        try {
          tags = JSON.parse(oldData.tags);
        } catch (e) {
          tags = [];
        }
      }
      form.setFieldsValue({
        ...oldData,
        tags,
      });
      setCover(oldData.cover);
    }
  }, [visible, oldData, form]);

  /**
   * 上传属性
   */
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadFile(
          {
            fileUploadRequest: {
              biz: FileUploadBiz.POST_COVER,
            },
          },
          {},
          file,
        );
        if (res.code === 0 && res.data?.url) {
          onSuccess(res.data);
          setCover(res.data.url);
          message.success('封面上传成功');
        } else {
          onError(new Error(res.message));
          message.error(`封面上传失败: ${res.message}`);
        }
      } catch (error: any) {
        onError(error);
        message.error(`文件上传失败: ${error.message}`);
      }
    },
    onRemove() {
      setCover(undefined);
    },
  };

  if (!oldData) {
    return null;
  }

  return (
    <ModalForm<API.PostUpdateRequest>
      title="更新帖子信息"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await updatePost({
            ...values,
            id: oldData.id as number,
            cover,
          });
          if (res.code === 0) {
            message.success('更新成功');
            onSubmit?.(values);
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
      <ProFormUploadDragger
        title="点击或拖拽文件到此区域进行上传"
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="file"
        label="封面"
      />
    </ModalForm>
  );
};
export default UpdatePostModal;
