import {
  CarryOutOutlined,
  DeleteOutlined,
  EyeOutlined,
  HistoryOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable, StatisticCard } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteUserLoginLog, listLogByPage1 } from '@/services/log/userLoginLogController';
import { LoginStatusEnumMap } from '@/enums/LoginStatusEnum';
import ViewUserLoginLogModal from './components/ViewUserLoginLogModal';

/**
 * 登录日志页面
 */
const UserLoginLog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserLoginLogVO>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalLogins, setTotalLogins] = useState<number>(0);
  const [failureCount, setFailureCount] = useState<number>(0);

  /**
   * 删除日志
   * @param id
   */
  const handleDelete = async (id: any) => {
    const hide = message.loading('正在删除');
    try {
      await deleteUserLoginLog({ id: id as any });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error: any) {
      message.error(`删除失败: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 批量删除日志
   * @param ids
   */
  const handleBatchDelete = async (ids: React.Key[]) => {
    const hide = message.loading('正在批量删除');
    try {
      await Promise.all(ids.map((id) => deleteUserLoginLog({ id: id as any })));
      message.success('批量删除成功');
      setSelectedRowKeys([]);
      actionRef.current?.reloadAndRest?.();
    } catch (error: any) {
      message.error(`批量删除失败: ${error.message}`);
    } finally {
      hide();
    }
  };

  const columns: ProColumns<API.UserLoginLogVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户账号',
      dataIndex: 'account',
      width: 120,
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'clientIp',
      width: 140,
    },
    {
      title: '地点',
      dataIndex: 'location',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: LoginStatusEnumMap,
      render: (_, record) => {
        const statusInfo = LoginStatusEnumMap[record.status as keyof typeof LoginStatusEnumMap];
        return <Badge status={statusInfo?.status as any} text={statusInfo?.text} />;
      },
    },
    {
      title: '登录时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 180,
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
            <Typography.Link key="view">
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewUserLoginLogModal>
          <Popconfirm
            title="确定删除此登录日志吗？"
            description="删除后将无法恢复。"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link key="delete" type="danger">
              <DeleteOutlined /> 删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '登录日志',
        breadcrumb: {},
      }}
    >
      <StatisticCard.Group direction="row" gutter={16} style={{ marginBottom: 24 }}>
        <StatisticCard
          statistic={{
            title: '总登录次数',
            value: totalLogins,
            icon: <HistoryOutlined style={{ color: '#1890ff' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '登录异常',
            value: failureCount,
            valueStyle: { color: failureCount > 0 ? '#cf1322' : 'inherit' },
            icon: <WarningOutlined style={{ color: '#cf1322' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '系统安全性',
            value: '正常',
            status: failureCount === 0 ? 'success' : 'warning',
            icon: <SafetyCertificateOutlined style={{ color: '#52c41a' }} />,
          }}
        />
      </StatisticCard.Group>
      <ProTable<API.UserLoginLogVO, API.UserLoginLogQueryRequest>
        headerTitle="日志列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listLogByPage1({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.UserLoginLogQueryRequest);

          if (code === 0) {
            setTotalLogins(Number(data?.total) || 0);
            const failures =
              data?.records?.filter((r) => {
                const status = String(r.status ?? '').toLowerCase();
                return status === '2' || status === 'failed';
              }).length || 0;
            setFailureCount(failures);
          }

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={16}>
              <Popconfirm
                title="确定批量删除？"
                onConfirm={async () => {
                  await handleBatchDelete(selectedRowKeys);
                  onCleanSelected();
                }}
              >
                <Button danger type="primary" size="small">
                  批量删除
                </Button>
              </Popconfirm>
              <Button size="small" onClick={onCleanSelected}>
                取消选择
              </Button>
            </Space>
          );
        }}
        scroll={{ x: 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
      />
    </PageContainer>
  );
};

export default UserLoginLog;
