import { LockOutlined, MailOutlined } from '@ant-design/icons';
import React from 'react';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { message, theme } from 'antd';
import { sendEmailLoginCode } from '@/services/user/userController';

const EmailLoginPage: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: (
            <MailOutlined
              style={{
                color: token.colorText,
              }}
              className={'prefixIcon'}
            />
          ),
        }}
        name="email"
        placeholder={'邮箱'}
        rules={[
          {
            required: true,
            message: '请输入邮箱！',
          },
          {
            type: 'email',
            message: '邮箱格式错误！',
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          prefix: (
            <LockOutlined
              style={{
                color: token.colorText,
              }}
              className={'prefixIcon'}
            />
          ),
        }}
        captchaProps={{
          size: 'large',
        }}
        placeholder={'请输入验证码'}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${'获取验证码'}`;
          }
          return '获取验证码';
        }}
        name="code"
        phoneName="email"
        rules={[
          {
            required: true,
            message: '请输入验证码！',
          },
        ]}
        onGetCaptcha={async (email) => {
          if (!email) {
            message.error('请先输入邮箱！');
            return;
          }
          try {
            const res = await sendEmailLoginCode({ email });
            if (res.code === 0) {
              message.success('验证码发送成功！');
            } else {
              message.error(`发送失败：${res.message}`);
              throw new Error(res.message);
            }
          } catch (error: any) {
            message.error(`发送失败：${error.message}`);
            throw error;
          }
        }}
      />
    </>
  );
};

export default EmailLoginPage;
