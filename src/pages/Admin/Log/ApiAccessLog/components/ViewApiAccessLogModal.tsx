import { Modal, Tag, Button } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';

interface Props {
  record: API.ApiAccessLogVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.ApiAccessLogVO>[];
}

/**
 * API 访问日志详情 Modal
 */
const ViewApiAccessLogModal: React.FC<Props> = (props) => {
  const { record, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.ApiAccessLogVO>[] = [
    { title: '日志ID', dataIndex: 'id' },
    { title: '链路追踪ID', dataIndex: 'traceId' },
    { title: '用户ID', dataIndex: 'userId' },
    {
      title: '请求方式',
      dataIndex: 'method',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    { title: '请求路径', dataIndex: 'path', span: 2 },
    {
      title: '查询参数',
      dataIndex: 'query',
      span: 2,
      render: (text) => <pre style={{ maxHeight: 200, overflow: 'auto' }}>{text || '-'}</pre>,
    },
    {
      title: '响应状态码',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={Number(status) >= 200 && Number(status) < 300 ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: '请求耗时',
      dataIndex: 'latencyMs',
      render: (text) => `${text} ms`,
    },
    { title: '客户端IP', dataIndex: 'clientIp' },
    {
      title: '请求大小',
      dataIndex: 'requestSize',
      render: (text) => `${text} bytes`,
    },
    {
      title: '响应大小',
      dataIndex: 'responseSize',
      render: (text) => `${text} bytes`,
    },
    { title: 'User-Agent', dataIndex: 'userAgent', span: 2 },
    { title: 'Referer', dataIndex: 'referer', span: 2, render: (text) => text || '-' },
    { title: '创建时间', dataIndex: 'createTime', span: 2, valueType: 'dateTime' },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="API 访问日志详情"
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
        />
      </Modal>
    </>
  );
};

export default ViewApiAccessLogModal;
