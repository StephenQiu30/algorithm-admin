import { ModalForm, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import { LoginStatusEnumMap } from '@/enums/LoginStatusEnum';

interface Props {
  record: API.UserLoginLogVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.UserLoginLogVO>[];
}

/**
 * 用户登录日志详情
 */
const ViewUserLoginLogModal: React.FC<Props> = (props) => {
  const { record, children, columns } = props;

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
    { title: '归属地', dataIndex: 'location' },
    { title: 'User-Agent', dataIndex: 'userAgent' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
  ];

  return (
    <ModalForm
      title="登录日志详情"
      trigger={children}
      submitter={{
        render: (_, doms) => [
          <Button key="close" onClick={() => (doms[0] as any).props.onCancel?.()}>
            关闭
          </Button>,
        ],
      }}
      width={600}
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <ProDescriptions<API.UserLoginLogVO>
        column={1}
        dataSource={record}
        columns={columns || defaultColumns}
      />
    </ModalForm>
  );
};

export default ViewUserLoginLogModal;
