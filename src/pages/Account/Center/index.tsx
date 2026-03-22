import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React, { useState } from 'react';
import {
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  ProfileOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { userRole, UserRoleEnum } from '@/enums/UserRoleEnum';
import BasicSettings from './components/BasicSettings';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      width: '100%',
    },
    avatarHolder: {
      marginBottom: '24px',
      textAlign: 'center',
      '& > img': {
        width: '104px',
        height: '104px',
        marginBottom: '20px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: `4px solid ${token.colorBgContainer}`,
        boxShadow: token.boxShadow,
      },
    },
    name: {
      marginBottom: '4px',
      color: token.colorTextHeading,
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '28px',
    },
    profile: {
      marginBottom: '24px',
      color: token.colorTextSecondary,
    },
    detail: {
      p: {
        position: 'relative',
        marginBottom: '8px',
        paddingLeft: '2px',
        wordBreak: 'break-all',
        color: token.colorText,
        display: 'flex',
        alignItems: 'center',
        '&:last-child': {
          marginBottom: 0,
        },
      },
    },
  };
});

const AccountCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { styles } = useStyles();
  const [activeKey, setActiveKey] = useState<string>('basic');

  if (!currentUser) {
    return null;
  }

  return (
    <PageContainer title={false}>
      <ProCard bordered headerBordered split="vertical" style={{ minHeight: '600px' }}>
        <ProCard
          colSpan={{ xs: 24, sm: 24, md: 8, lg: 8, xl: 6 }}
          title={
            <span>
              <UserOutlined style={{ marginRight: 8 }} />
              个人信息
            </span>
          }
        >
          <div className={styles.avatarHolder}>
            <img alt="" src={currentUser.userAvatar} />
            <div className={styles.name}>{currentUser.userName}</div>
            <div className={styles.profile}>{currentUser.userProfile || '暂无简介'}</div>
          </div>
          <div className={styles.detail}>
            <p>
              <ProfileOutlined style={{ marginRight: 8, color: 'rgba(0, 0, 0, 0.45)' }} />
              {userRole[currentUser.userRole as UserRoleEnum]?.text || '未知角色'}
            </p>
            <p>
              <MailOutlined style={{ marginRight: 8, color: 'rgba(0, 0, 0, 0.45)' }} />
              {currentUser.userEmail || '未绑定邮箱'}
            </p>
            <p>
              <PhoneOutlined style={{ marginRight: 8, color: 'rgba(0, 0, 0, 0.45)' }} />
              {currentUser.userPhone || '未绑定手机'}
            </p>
            <p>
              <CalendarOutlined style={{ marginRight: 8, color: 'rgba(0, 0, 0, 0.45)' }} />
              {currentUser.createTime}
            </p>
          </div>
        </ProCard>
        <ProCard
          title={
            <span>
              <SettingOutlined style={{ marginRight: 8 }} />
              个人设置
            </span>
          }
          tabs={{
            activeKey,
            onChange: setActiveKey,
            items: [
              {
                key: 'basic',
                label: '基本设置',
                children: (
                  <div style={{ padding: '8px 0' }}>
                    <BasicSettings />
                  </div>
                ),
              },
            ],
          }}
        />
      </ProCard>
    </PageContainer>
  );
};

export default AccountCenter;
