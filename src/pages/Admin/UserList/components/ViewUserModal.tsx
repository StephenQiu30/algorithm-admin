import { Modal, Button, Avatar } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { userRole } from '@/enums/UserRoleEnum';
import { EmailVerifiedEnumMap } from '@/enums/EmailVerifiedEnum';

interface Props {
  user: API.User;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.User>[];
}

/**
 * 用户详情 Modal
 */
const ViewUserModal: React.FC<Props> = (props) => {
  const { user, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.User>[] = [
    { title: '用户ID', dataIndex: 'id', copyable: true },
    { title: '用户名', dataIndex: 'userName' },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      render: (text) => <Avatar src={text as string} size="large" />,
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: userRole,
    },
    { title: '邮箱', dataIndex: 'userEmail' },
    {
      title: '邮箱验证',
      dataIndex: 'emailVerified',
      valueEnum: EmailVerifiedEnumMap,
    },
    { title: '手机号', dataIndex: 'userPhone' },
    {
      title: 'GitHub 账号',
      dataIndex: 'githubLogin',
      render: (_, record) =>
        record.githubLogin ? (
          <a href={record.githubUrl} target="_blank" rel="noreferrer">
            {record.githubLogin}
          </a>
        ) : (
          '-'
        ),
    },
    { title: '个人简介', dataIndex: 'userProfile', span: 2 },
    { title: '最后登录 IP', dataIndex: 'lastLoginIp' },
    { title: '最后登录时间', dataIndex: 'lastLoginTime', valueType: 'dateTime' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
    { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime' },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="用户详情"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="close" onClick={() => setVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
        destroyOnClose
      >
        <ProDescriptions<API.User>
          column={2}
          dataSource={user}
          columns={columns || defaultColumns}
        />
      </Modal>
    </>
  );
};

export default ViewUserModal;
