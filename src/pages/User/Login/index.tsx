import { Footer } from '@/components';
import { LoginForm } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Image, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { createStyles } from 'antd-style';
import { STEPHEN_SUBTITLE, STEPHEN_TITLE } from '@/constants';
import { EmailLoginPage } from '@/pages/User/Login/components';
import { userLoginByEmail } from '@/services/user/userController';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundColor: token.colorBgContainer,
    },
    content: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 12px',
    },
    loginCard: {
      width: '100%',
      maxWidth: '480px',
      padding: '32px',
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowTertiary,
      backgroundColor: token.colorBgContainer,
    },
  };
});

/**
 * 登录页面
 * @constructor
 */
const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [redirected, setRedirected] = useState(false);
  const { styles } = useStyles();

  // 用户登录
  const handleLoginSubmit = async (values: API.UserEmailLoginRequest) => {
    const hide = message.loading('正在登录中..');
    try {
      const res = await userLoginByEmail({ ...values });
      if (res.code === 0 && res.data) {
        if (res.data.userRole !== 'admin') {
          message.error('无权限，仅管理员可登录！');
          return;
        }
        setInitialState({
          ...initialState,
          currentUser: res?.data,
        });
        localStorage.setItem('stephen-token', res?.data?.token || '');
        setRedirected(true);
        message.success('登录成功！');
      } else {
        message.error(`登录失败${res.message}, 请重试！`);
      }
    } catch (error: any) {
      message.error(`登录失败${error.message}, 请重试！`);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    if (redirected) {
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    }
  }, [redirected]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loginCard}>
          <LoginForm
            logo={<Image preview={false} width={48} alt="logo" src="/logo.svg" />}
            title={
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                {STEPHEN_TITLE}
              </Typography.Title>
            }
            subTitle={STEPHEN_SUBTITLE}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleLoginSubmit(values as API.UserEmailLoginRequest);
            }}
          >
            <EmailLoginPage />
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
