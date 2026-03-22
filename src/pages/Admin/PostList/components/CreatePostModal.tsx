import { message, UploadProps } from 'antd';
import React, { useState } from 'react';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { MarkdownEditor } from '@/components';

import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { uploadFile } from '@/services/file/fileController';
import { addPost } from '@/services/post/postController';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => void;
}

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreatePostModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const [cover, setCover] = useState<string>();
  const [form] = ProForm.useForm<API.PostAddRequest>();

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

  return (
    <ModalForm<API.PostAddRequest>
      title="新建帖子"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await addPost({
            ...values,
            cover,
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
export default CreatePostModal;
