import { Modal, Tag, Button } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { EmailStatusEnumMap } from '@/enums/EmailStatusEnum';

interface Props {
  record: API.EmailRecordVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.EmailRecordVO>[];
}

/**
 * 邮件发送记录详情 Modal
 */
const ViewEmailRecordModal: React.FC<Props> = (props) => {
  const { record, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.EmailRecordVO>[] = [
    { title: '记录ID', dataIndex: 'id' },
    { title: '消息ID', dataIndex: 'msgId' },
    { title: '业务幂等ID', dataIndex: 'bizId' },
    { title: '业务类型', dataIndex: 'bizType' },
    { title: '收件人邮箱', dataIndex: 'toEmail', span: 2 },
    { title: '邮件主题', dataIndex: 'subject', span: 2 },
    {
      title: '发送状态',
      dataIndex: 'status',
      valueEnum: EmailStatusEnumMap,
      render: (_, record) => {
        if (record.status === undefined) {
          return '-';
        }
        const statusInfo = EmailStatusEnumMap[record.status as keyof typeof EmailStatusEnumMap];
        return <Tag color={statusInfo?.status}>{statusInfo?.text}</Tag>;
      },
    },
    { title: '重试次数', dataIndex: 'retryCount' },
    { title: '发送渠道', dataIndex: 'provider' },
    { title: '发送时间', dataIndex: 'sendTime', valueType: 'dateTime' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
    { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime' },
    {
      title: '邮件内容',
      dataIndex: 'content',
      span: 2,
      render: (text) => (
        <div
          style={{
            padding: 16,
            border: '1px solid #f0f0f0',
            borderRadius: 4,
            maxHeight: 400,
            overflow: 'auto',
            background: '#fafafa',
          }}
          dangerouslySetInnerHTML={{ __html: (text as string) || '-' }}
        />
      ),
    },
    {
      title: '错误信息',
      dataIndex: 'errorMessage',
      span: 2,
      hideInDescriptions: !record?.errorMessage,
      render: (text) => (
        <pre style={{ color: 'red', maxHeight: 200, overflow: 'auto' }}>{text}</pre>
      ),
    },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="邮件发送记录详情"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="close" onClick={() => setVisible(false)}>
            关闭
          </Button>,
        ]}
        width={1000}
        destroyOnClose
      >
        <ProDescriptions<API.EmailRecordVO>
          column={2}
          dataSource={record}
          columns={columns || defaultColumns}
        />
      </Modal>
    </>
  );
};

export default ViewEmailRecordModal;
