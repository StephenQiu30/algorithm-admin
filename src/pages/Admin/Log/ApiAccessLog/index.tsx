import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listLogByPage2, deleteApiAccessLog } from '@/services/log/apiAccessLogController';
import { ApiAccessStatusEnumMap } from '@/enums/ApiAccessStatusEnum';
import ViewApiAccessLogModal from './components/ViewApiAccessLogModal';

/**
 * API 访问日志页面
 */
const ApiAccessLog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * 删除日志
   * @param id
   */
  const handleDelete = async (id: any) => {
    const hide = message.loading('正在删除');
    try {
      await deleteApiAccessLog({ id: id as any });
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
      await Promise.all(ids.map((id) => deleteApiAccessLog({ id: id as any })));
      message.success('批量删除成功');
      setSelectedRowKeys([]);
      actionRef.current?.reloadAndRest?.();
    } catch (error: any) {
      message.error(`批量删除失败: ${error.message}`);
    } finally {
      hide();
    }
  };

  const columns: ProColumns<API.ApiAccessLogVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      ellipsis: true,
      minWidth: 200,
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      width: 100,
      render: (method) => {
        const colors: Record<string, string> = {
          GET: 'blue',
          POST: 'green',
          PUT: 'orange',
          DELETE: 'red',
        };
        return (
          <Tag color={colors[method as string] || 'default'}>
            {method as string}
          </Tag>
        );
      },
    },
    {
      title: '响应状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: ApiAccessStatusEnumMap,
      render: (status) => {
        const s = Number(status);
        if (s >= 200 && s < 300) return <Badge status="success" text={s} />;
        if (s >= 400) return <Badge status="error" text={s} />;
        return <Badge status="default" text={s} />;
      },
    },
    {
      title: '耗时',
      dataIndex: 'latencyMs',
      width: 100,
      hideInSearch: true,
      sorter: true,
      render: (latency) => {
        const l = Number(latency);
        let color = 'green';
        if (l > 500) color = 'orange';
        if (l > 1000) color = 'red';
        return <Tag color={color}>{l}ms</Tag>;
      },
    },
    {
      title: '时间',
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
          <ViewApiAccessLogModal record={record}>
            <Typography.Link key="view">
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewApiAccessLogModal>
          <Popconfirm
            title="确定删除此日志吗？"
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
        title: 'API 访问日志',
        breadcrumb: {},
      }}
    >
      <ProTable<API.ApiAccessLogVO, API.ApiAccessLogQueryRequest>
        headerTitle="访问记录"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listLogByPage2({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.ApiAccessLogQueryRequest);

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

export default ApiAccessLog;
