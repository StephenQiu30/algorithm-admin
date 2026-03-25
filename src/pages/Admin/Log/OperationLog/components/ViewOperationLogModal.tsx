import { Modal, Tag, Button, Typography } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { OperationStatusEnumMap } from '@/enums/OperationStatusEnum';

interface Props {
  record: API.OperationLogVO;
  children?: React.ReactElement;
}

/**
 * 操作日志详情 Modal
 */
const ViewOperationLogModal: React.FC<Props> = (props) => {
  const { record, children } = props;
  const [visible, setVisible] = useState(false);

  const columns: ProDescriptionsItemProps<API.OperationLogVO>[] = [
    { title: '操作人', dataIndex: 'operatorName' },
    { title: '操作模块', dataIndex: 'module' },
    { title: '操作内容', dataIndex: 'action' },
    {
      title: '请求方式',
      dataIndex: 'method',
      render: (text) => text && <Tag color="processing">{text as string}</Tag>,
    },
    { title: '请求路径', dataIndex: 'path', span: 2 },
    {
      title: '请求参数',
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
    { title: '状态码', dataIndex: 'responseStatus' },
    {
      title: '操作状态',
      dataIndex: 'success',
      valueEnum: OperationStatusEnumMap,
    },
    { title: '客户端IP', dataIndex: 'clientIp' },
    { title: '归属地', dataIndex: 'location' },
    { title: '操作时间', dataIndex: 'createTime', valueType: 'dateTime' },
    {
      title: '错误信息',
      dataIndex: 'errorMessage',
      span: 2,
      hideInDescriptions: !record?.errorMessage,
      render: (text) => (
        <div style={{ color: '#ff4d4f', background: '#fff2f0', padding: '8px', borderRadius: '4px', border: '1px solid #ffccc7' }}>
          {text as string}
        </div>
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
        title="操作日志详情"
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
        <ProDescriptions<API.OperationLogVO>
          column={2}
          dataSource={record}
          columns={columns}
          labelStyle={{ fontWeight: 'bold' }}
        />
      </Modal>
    </>
  );
};

export default ViewOperationLogModal;
