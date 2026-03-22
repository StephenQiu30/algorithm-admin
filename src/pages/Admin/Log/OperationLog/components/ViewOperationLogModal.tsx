import { Modal, Tag, Button } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { OperationStatusEnumMap } from '@/enums/OperationStatusEnum';

interface Props {
  record: API.OperationLogVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.OperationLogVO>[];
}

/**
 * 操作日志详情 Modal
 */
const ViewOperationLogModal: React.FC<Props> = (props) => {
  const { record, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.OperationLogVO>[] = [
    { title: '日志ID', dataIndex: 'id' },
    { title: '操作人ID', dataIndex: 'operatorId' },
    { title: '操作人名称', dataIndex: 'operatorName' },
    { title: '操作模块', dataIndex: 'module' },
    { title: '操作类型', dataIndex: 'action' },
    {
      title: 'HTTP方法',
      dataIndex: 'method',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    { title: '请求路径', dataIndex: 'path', span: 2 },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      span: 2,
      render: (text) => <pre style={{ maxHeight: 200, overflow: 'auto' }}>{text || '-'}</pre>,
    },
    { title: '响应状态码', dataIndex: 'responseStatus' },
    {
      title: '操作状态',
      dataIndex: 'success',
      valueEnum: OperationStatusEnumMap,
    },
    { title: '客户端IP', dataIndex: 'clientIp' },
    { title: '创建时间', dataIndex: 'createTime', span: 1, valueType: 'dateTime' },
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
        title="操作日志详情"
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
        <ProDescriptions<API.OperationLogVO>
          column={2}
          dataSource={record}
          columns={columns || defaultColumns}
        />
      </Modal>
    </>
  );
};

export default ViewOperationLogModal;
