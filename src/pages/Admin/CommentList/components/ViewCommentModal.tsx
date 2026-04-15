import { history } from '@umijs/max';
import { Avatar, Button, Modal, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';

interface Props {
  comment: API.PostCommentVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.PostCommentVO>[];
}

/**
 * 评论详情 Modal
 */
const ViewCommentModal: React.FC<Props> = (props) => {
  const { comment, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.PostCommentVO>[] = [
    { title: '评论ID', dataIndex: 'id', copyable: true },
    {
      title: '发布者',
      dataIndex: 'userId',
      render: (_, record) => (
        <Space>
          {record.userVO?.userAvatar && <Avatar src={record.userVO.userAvatar} size="small" />}
          <Typography.Text strong>{record.userVO?.userName || record.userId}</Typography.Text>
          <Typography.Text type="secondary">(ID: {record.userId})</Typography.Text>
        </Space>
      ),
    },
    { title: '帖子ID', dataIndex: 'postId', copyable: true },
    {
      title: '继续处理',
      dataIndex: 'continueAction',
      render: (_, record) => (
        <Typography.Link onClick={() => history.push(`/admin/post?postId=${record.postId}`)}>
          打开帖子管理页
        </Typography.Link>
      ),
    },
    {
      title: '父评论ID',
      dataIndex: 'parentId',
      copyable: true,
      hideInDescriptions: !comment?.parentId,
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      render: (text) => <div style={{ whiteSpace: 'pre-wrap' }}>{text || '-'}</div>,
    },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="评论详情"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="close" onClick={() => setVisible(false)}>
            关闭
          </Button>,
        ]}
        width={700}
        destroyOnClose
      >
        <ProDescriptions<API.PostCommentVO>
          column={1}
          dataSource={comment}
          columns={columns || defaultColumns}
        />
      </Modal>
    </>
  );
};

export default ViewCommentModal;
