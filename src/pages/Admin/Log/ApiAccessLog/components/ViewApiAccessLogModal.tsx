import { ModalForm, ProDescriptions } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import React from 'react';

interface Props {
  record: API.ApiAccessLogVO;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 接口访问日志详情
 * @param props
 * @constructor
 */
const ViewApiAccessLogModal: React.FC<Props> = (props) => {
  const { record, visible, onCancel } = props;

  return (
    <ModalForm
      title="接口访问日志详情"
      open={visible}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
      submitter={{
        render: () => [
          <Button key="close" onClick={onCancel}>关闭</Button>
        ]
      }}
      width={800}
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <ProDescriptions<API.ApiAccessLogVO>
        column={2}
        dataSource={record}
        columns={[
          { title: '日志ID', dataIndex: 'id', span: 2 },
          { title: '请求接口', dataIndex: 'uri', span: 2, copyable: true },
          { title: '请求方法', dataIndex: 'method', render: (text) => <Tag color="blue">{String(text).toUpperCase()}</Tag> },
          { title: '用户ID', dataIndex: 'userId' },
          {
            title: '查询参数',
            dataIndex: 'query',
            span: 2,
            render: (text) => <pre style={{ maxHeight: 200, overflow: 'auto' }}>{text || '-'}</pre>,
          },
          {
            title: '请求体',
            dataIndex: 'requestParams',
            span: 2,
            render: (text) => <pre style={{ maxHeight: 200, overflow: 'auto' }}>{text || '-'}</pre>,
          },
          {
            title: '响应体',
            dataIndex: 'responseBody',
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
        ]}
      />
    </ModalForm>
  );
};

export default ViewApiAccessLogModal;
