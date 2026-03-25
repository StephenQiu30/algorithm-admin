import { Modal, Button, Typography } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { LoginStatusEnumMap } from '@/enums/LoginStatusEnum';

interface Props {
  record: API.UserLoginLogVO;
  children?: React.ReactElement;
}

/**
 * 用户登录日志详情
 */
const ViewUserLoginLogModal: React.FC<Props> = (props) => {
  const { record, children } = props;
  const [visible, setVisible] = useState(false);

  const columns: ProDescriptionsItemProps<API.UserLoginLogVO>[] = [
    { title: '用户账号', dataIndex: 'account' },
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
      render: (text) => <span style={{ color: '#ff4d4f' }}>{text as string}</span>,
    },
    { title: '客户端IP', dataIndex: 'clientIp' },
    { title: '归属地', dataIndex: 'location' },
    {
      title: 'User-Agent',
      dataIndex: 'userAgent',
      span: 2,
      render: (text) => (
        <Typography.Paragraph
          ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}
          style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', margin: 0 }}
        >
          {text as string || '-'}
        </Typography.Paragraph>
      ),
    },
    { title: '登录时间', dataIndex: 'createTime', valueType: 'dateTime' },
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
          column={2}
          dataSource={record}
          columns={columns}
          labelStyle={{ fontWeight: 'bold' }}
        />
      </Modal>
    </>
  );
};

export default ViewUserLoginLogModal;
