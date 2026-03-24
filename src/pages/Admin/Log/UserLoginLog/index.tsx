import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listLogByPage1 } from '@/services/log/userLoginLogController';
import { deleteUserLoginLog } from '@/services/log/userLoginLogController';
import { LoginStatusEnumMap } from '@/enums/LoginStatusEnum';
import ViewUserLoginLogModal from './components/ViewUserLoginLogModal';

/**
 * 登录日志页面
 */
const UserLoginLog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserLoginLogVO[]>([]);

  /**
   * 删除日志
   * @param record
   */
  const handleDelete = async (record: API.UserLoginLogVO) => {
    const hide = message.loading('正在删除');
    if (!record?.id) return true;
    try {
      await deleteUserLoginLog({ id: record.id as any });
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      message.error(`删除失败: ${error.message}`);
      return false;
    } finally {
      hide();
    }
  };

  /**
   * 批量删除日志
   * @param selectedRows
   */
  const handleBatchDelete = async (selectedRows: API.UserLoginLogVO[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows?.length) return true;
    try {
      await Promise.all(selectedRows.map((row) => deleteUserLoginLog({ id: row.id as any })));
      message.success('批量删除成功');
      actionRef.current?.reloadAndRest?.();
      setSelectedRows([]);
      return true;
    } catch (error: any) {
      message.error(`批量删除失败: ${error.message}`);
      return false;
    } finally {
      hide();
    }
  };

  const columns: ProColumns<API.UserLoginLogVO>[] = [
    { title: '用户ID', dataIndex: 'userId', width: 120, copyable: true, hideInTable: true },
    { title: '用户账号', dataIndex: 'account', width: 120, copyable: true },
    {
      title: 'IP地址',
      dataIndex: 'clientIp',
      width: 120,
    },
    { title: '地点', dataIndex: 'location', width: 120, hideInSearch: true },
    { title: 'User-Agent', dataIndex: 'userAgent', ellipsis: true, hideInSearch: true },
    { title: '登录类型', dataIndex: 'loginType', width: 100 },
    { title: '失败原因', dataIndex: 'failReason', width: 120, ellipsis: true, hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: LoginStatusEnumMap,
      render: (status) => {
        const s = status as string;
        if (s === 'SUCCESS') return <Badge status="success" text="成功" />;
        if (s === 'FAILED') return <Badge status="error" text="失败" />;
        return <Badge status="processing" text={s} />;
      },
    },
    {
      title: '登录时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 160,
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 160,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <ViewUserLoginLogModal record={record}>
            <Typography.Link key="view" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewUserLoginLogModal>
          <Popconfirm
            title="确定删除此登录日志吗？"
            description="删除后将无法恢复。"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link
              key="delete"
              type="danger"
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <DeleteOutlined /> 删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.UserLoginLogVO>
        headerTitle="登录日志"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listLogByPage1({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          });

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        scroll={{ x: 1100 }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
            </div>
          }
        >
          <Popconfirm
            title="确定批量删除？"
            description="删除后将无法恢复？"
            onConfirm={() => handleBatchDelete(selectedRowsState)}
          >
            <Button danger type="primary">
              批量删除
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}
    </>
  );
};

export default UserLoginLog;
