import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { LoginStatusEnumMap } from '@/enums/LoginStatusEnum';

interface Props {
  record: API.UserLoginLogVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.UserLoginLogVO>[];
}

/**
 * 用户登录日志详情 Modal
 */
const ViewUserLoginLogModal: React.FC<Props> = (props) => {
  const { record, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.UserLoginLogVO>[] = [
    { title: '日志ID', dataIndex: 'id' },
    { title: '用户ID', dataIndex: 'userId' },
    { title: '登录账号', dataIndex: 'account' },
    { title: '登录类型', dataIndex: 'loginType' },
    {
      title: '登录状态',
      dataIndex: 'status',
      valueEnum: LoginStatusEnumMap,
    },
    {
      title: '失败原因',
      dataIndex: 'failReason',
      hideInDescriptions: !record?.failReason,
      render: (text) => <span style={{ color: 'red' }}>{text}</span>,
    },
    { title: '客户端IP', dataIndex: 'clientIp' },
    { title: 'User-Agent', dataIndex: 'userAgent' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="登录日志详情"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="close" onClick={() => setVisible(false)}>
            关闭
          </Button>,
        ]}
        width={600}
        destroyOnClose
      >
        <ProDescriptions<API.UserLoginLogVO>
          column={1}
          dataSource={record}
          columns={columns || defaultColumns}
        />
      </Modal>
    </>
  );
};

export default ViewUserLoginLogModal;
