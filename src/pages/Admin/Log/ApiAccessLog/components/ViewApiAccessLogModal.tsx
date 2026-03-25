import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Button, Tag, Modal, Typography } from 'antd';
import React, { useState } from 'react';

interface Props {
  record: API.ApiAccessLogVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.ApiAccessLogVO>[];
}

/**
 * 接口访问日志详情
 */
const ViewApiAccessLogModal: React.FC<Props> = (props) => {
  const { record, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.ApiAccessLogVO>[] = [
    { title: '请求接口', dataIndex: 'path', span: 2, copyable: true },
    { 
      title: '请求方法', 
      dataIndex: 'method', 
      render: (text) => text && <Tag color="processing">{String(text).toUpperCase()}</Tag> 
    },
    { title: '用户ID', dataIndex: 'userId' },
    {
      title: '查询参数',
      dataIndex: 'query',
      span: 2,
      render: (text) => (
        <Typography.Paragraph
          ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
          style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', margin: 0 }}
        >
          {text as string || '-'}
        </Typography.Paragraph>
      ),
    },
    {
      title: '请求体',
      dataIndex: 'requestParams',
      span: 2,
      render: (text) => (
        <Typography.Paragraph
          ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
          style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', margin: 0 }}
        >
          {text as string || '-'}
        </Typography.Paragraph>
      ),
    },
    {
      title: '响应体',
      dataIndex: 'responseBody',
      span: 2,
      render: (text) => (
        <Typography.Paragraph
          ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
          style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', margin: 0 }}
        >
          {text as string || '-'}
        </Typography.Paragraph>
      ),
    },
    {
      title: '响应状态码',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={Number(status) >= 200 && Number(status) < 300 ? 'success' : 'error'}>{status as string}</Tag>
      ),
    },
    {
      title: '请求耗时',
      dataIndex: 'latencyMs',
      render: (text) => <Tag color="blue">{text as string} ms</Tag>,
    },
    { title: '客户端IP', dataIndex: 'clientIp' },
    {
      title: '请求大小',
      dataIndex: 'requestSize',
      render: (size) => {
        const s = Number(size);
        if (isNaN(s)) return '-';
        if (s < 1024) return `${s} B`;
        return `${(s / 1024).toFixed(2)} KB`;
      },
    },
    { title: 'User-Agent', dataIndex: 'userAgent', span: 2 },
    { title: '创建时间', dataIndex: 'createTime', span: 2, valueType: 'dateTime' },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="接口访问日志详情"
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
        <ProDescriptions<API.ApiAccessLogVO>
          column={2}
          dataSource={record}
          columns={columns || defaultColumns}
          labelStyle={{ fontWeight: 'bold' }}
        />
      </Modal>
    </>
  );
};

export default ViewApiAccessLogModal;
