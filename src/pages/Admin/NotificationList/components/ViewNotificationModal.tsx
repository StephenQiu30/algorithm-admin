import { Modal, Tag, Button, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { NotificationTypeEnumMap } from '@/enums/NotificationTypeEnum';
import { NotificationReadStatusEnumMap } from '@/enums/NotificationReadStatusEnum';

interface Props {
  notification: API.Notification;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.Notification>[];
}

/**
 * 通知详情 Modal
 */
const ViewNotificationModal: React.FC<Props> = (props) => {
  const { notification, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.Notification>[] = [
    { title: '通知ID', dataIndex: 'id', copyable: true },
    { title: '标题', dataIndex: 'title' },
    {
      title: '内容',
      dataIndex: 'content',
      render: (text) => <div style={{ whiteSpace: 'pre-wrap' }}>{text || '-'}</div>,
    },
    {
      title: '通知类型',
      dataIndex: 'type',
      valueEnum: NotificationTypeEnumMap,
    },
    {
      title: '已读状态',
      dataIndex: 'isRead',
      valueEnum: NotificationReadStatusEnumMap,
    },
    { title: '接收用户ID', dataIndex: 'userId', copyable: true },
    {
      title: '关联信息',
      dataIndex: 'related',
      render: (_, record) => (
        <Space>
          {record.relatedType && <Tag color="cyan">{record.relatedType}</Tag>}
          {record.relatedId && <Typography.Text copyable>{record.relatedId}</Typography.Text>}
          {!record.relatedType && '-'}
        </Space>
      ),
    },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="通知详情"
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
        <ProDescriptions<API.Notification>
          column={1}
          dataSource={notification}
          columns={columns || defaultColumns}
        />
      </Modal>
    </>
  );
};

export default ViewNotificationModal;
