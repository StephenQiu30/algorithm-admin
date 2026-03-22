import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Upload, Avatar, Row, Col, type UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { createStyles } from 'antd-style';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { uploadFile } from '@/services/file/fileController';
import { updateUser } from '@/services/user/userController';

const useStyles = createStyles(({ token }) => {
  return {
    baseView: {
      paddingTop: '12px',
    },
    avatarSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '@media screen and (max-width: 991px)': {
        marginBottom: '32px',
      },
    },
    avatarTitle: {
      height: '22px',
      marginBottom: '8px',
      color: token.colorTextHeading,
      fontSize: '14px',
      lineHeight: '22px',
    },
    avatar: {
      width: '144px',
      height: '144px',
      marginBottom: '12px',
      overflow: 'hidden',
    },
    buttonView: {
      width: '144px',
      textAlign: 'center',
    },
  };
});

const BasicSettings: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { styles } = useStyles();

  const handleSubmit = async (values: API.UserEditRequest) => {
    try {
      const res = await updateUser({
        ...values,
        id: currentUser?.id,
      });
      if (res.code === 0 && res.data) {
        message.success('更新基本信息成功');
        setInitialState((s) => ({
          ...s,
          currentUser: {
            ...s?.currentUser,
            ...values,
          },
        }));
      } else {
        message.error(`更新基本信息失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`操作失败: ${error.message}`);
    }
  };

  /**
   * 上传头像属性
   */
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      const hide = message.loading('正在上传并更新头像...');
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
          const newAvatar = res.data.url;
          // 同步更新服务器上的用户信息
          const updateRes = await updateUser({
            id: currentUser?.id,
            userAvatar: newAvatar,
          });
          if (updateRes.code === 0) {
            onSuccess(res.data);
            setInitialState((s) => ({
              ...s,
              currentUser: {
                ...s?.currentUser,
                userAvatar: newAvatar,
              },
            }));
            message.success('头像更新成功');
          } else {
            throw new Error(updateRes.message);
          }
        } else {
          throw new Error(res.message);
        }
      } catch (error: any) {
        onError(error);
        message.error(`头像更新失败: ${error.message}`);
      } finally {
        hide();
      }
    },
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只允许上传 JPG/PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  };

  if (!currentUser) return null;

  return (
    <div className={styles.baseView}>
      <Row gutter={64}>
        <Col span={24} md={24} lg={16} xl={12}>
          <ProForm
            layout="vertical"
            onFinish={handleSubmit}
            submitter={{
              searchConfig: {
                submitText: '更新基本信息',
              },
              render: (_, dom) => dom[1],
            }}
            initialValues={currentUser}
            hideRequiredMark
          >
            <ProFormText
              width="md"
              name="userName"
              label="昵称"
              rules={[{ required: true, message: '请输入您的昵称!' }]}
            />
            <ProFormTextArea name="userProfile" label="个人简介" placeholder="个人简介" />
            <ProFormText
              width="md"
              name="userEmail"
              label="邮箱"
              rules={[{ type: 'email', message: '邮箱格式不正确!' }]}
            />
            <ProFormText width="md" name="userPhone" label="联系电话" />
          </ProForm>
        </Col>
        <Col span={24} md={24} lg={8} xl={8}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarTitle}>头像</div>
            <div className={styles.avatar}>
              <Avatar size={144} src={currentUser.userAvatar} />
            </div>
            <Upload {...uploadProps}>
              <div className={styles.buttonView}>
                <Button icon={<UploadOutlined />}>修改头像</Button>
              </div>
            </Upload>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BasicSettings;
