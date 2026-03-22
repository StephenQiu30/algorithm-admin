import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { message, UploadProps } from 'antd';
import React, { useState } from 'react';
import { userRole } from '@/enums/UserRoleEnum';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { addUser } from '@/services/user/userController';
import { uploadFile } from '@/services/file/fileController';

interface Props {
  onCancel: () => void;
  onSubmit: (values?: API.UserAddRequest) => void;
  visible: boolean;
}

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateUserModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  // 用户头像
  const [userAvatar, setUserAvatar] = useState<string>();
  const [form] = ProForm.useForm<API.UserAddRequest>();
  /**
   * 用户更新头像
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
              biz: FileUploadBiz.USER_AVATAR,
            },
          },
          {},
          file,
        );
        if (res.code === 0 && res.data?.url) {
          onSuccess(res.data);
          setUserAvatar(res.data.url);
          message.success('头像上传成功');
        } else {
          onError(new Error(res.message));
          message.error(`头像上传失败: ${res.message}`);
        }
      } catch (error: any) {
        onError(error);
        message.error(`文件上传失败: ${error.message}`);
      }
    },
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只允许上传 JPG/PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('头像大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onRemove() {
      setUserAvatar(undefined);
    },
  };

  return (
    <ModalForm<API.UserAddRequest>
      title="新建用户"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await addUser({
            ...values,
            userAvatar,
          });
          if (res.code === 0) {
            message.success('添加成功');
            onSubmit?.(values);
            return true;
          } else {
            message.error(`添加失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`添加报错: ${error.message}`);
        }
        return false;
      }}
      autoFocusFirstInput
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
        name="userName"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
        placeholder="请输入用户名"
      />
      <ProFormText
        name="userEmail"
        label="邮箱"
        placeholder="请输入邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入正确的邮箱' },
        ]}
      />
      <ProFormText
        name="userPhone"
        label="电话"
        placeholder="请输入电话"
        rules={[{ pattern: /^1\d{10}$/, message: '请输入正确的手机号' }]}
      />
      <ProFormUploadDragger
        title="点击或拖拽文件到此区域进行上传"
        label="头像"
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="file"
      />
      <ProFormText name="githubLogin" label="GitHub 账号" placeholder="请输入 GitHub 账号" />
      <ProFormText
        name="githubUrl"
        label="GitHub 主页"
        placeholder="请输入 GitHub 主页 (例如: https://github.com/username)"
      />
      <ProFormSelect
        name="userRole"
        label="权限"
        valueEnum={userRole}
        rules={[{ required: true, message: '请选择权限' }]}
      />
    </ModalForm>
  );
};
export default CreateUserModal;
