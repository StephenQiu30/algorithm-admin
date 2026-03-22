import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Button, Divider, Space, Tag, theme, Typography } from 'antd';
import React from 'react';
import { history } from '@@/core/history';

const { Title, Text, Paragraph } = Typography;

interface Props {
  user: API.UserVO & { userProfile?: string };
  loading?: boolean;
}

const UserCard: React.FC<Props> = (props) => {
  const { user, loading } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { useToken } = theme;
  const { token } = useToken();

  const isSelf = currentUser?.id === user?.id;

  return (
    <ProCard
      loading={loading}
      bodyStyle={{ padding: 0 }}
      layout="center"
      direction="column"
      style={{
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        overflow: 'hidden',
        border: 'none',
      }}
    >
      {/* Cover Image */}
      <div
        style={{
          width: '100%',
          height: 160,
          background: 'linear-gradient(135deg, #1890ff 0%, #0050b3 100%)', // Dynamic Blue Gradient
          position: 'relative',
        }}
      >
        {isSelf && (
          <Button
            shape="circle"
            icon={<EditOutlined style={{ color: '#fff' }} />}
            type="text"
            onClick={() => history.push('/account/center')}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </div>

      {/* Avatar & Info */}
      <div
        style={{
          padding: '0 24px 24px',
          marginTop: -50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'relative', // Ensure z-index works if needed
        }}
      >
        <Avatar
          size={100}
          src={user?.userAvatar}
          icon={<UserOutlined />}
          style={{
            border: `4px solid ${token.colorBgContainer}`,
            boxShadow: token.boxShadow,
            marginBottom: 16,
            backgroundColor: token.colorBgContainer, // Fallback
          }}
        />

        <div style={{ textAlign: 'center' }}>
          <Space direction="vertical" size={4} align="center">
            <Title level={3} style={{ marginBottom: 0 }}>
              {user?.userName || 'User'}
            </Title>
            <Space>
              <Tag color={user?.userRole === 'admin' ? 'gold' : 'blue'} bordered={false}>
                {user?.userRole === 'admin' ? '管理员' : '普通用户'}
              </Tag>
              {user?.id && <Tag bordered={false}>ID: {user.id}</Tag>}
            </Space>
          </Space>

          <Divider style={{ margin: '16px 0' }} />

          <Paragraph
            type="secondary"
            ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
            style={{ maxWidth: 280, margin: '0 auto', textAlign: 'center' }}
          >
            {user?.userProfile || '这个人很懒，什么都没有写...'}
          </Paragraph>

          {user?.userEmail && (
            <div style={{ marginTop: 16 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {user.userEmail}
              </Text>
            </div>
          )}
        </div>
      </div>
    </ProCard>
  );
};

export default UserCard;
