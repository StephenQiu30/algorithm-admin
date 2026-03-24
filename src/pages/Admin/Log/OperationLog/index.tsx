import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listLogByPage } from '@/services/log/operationLogController';
import { deleteOperationLog } from '@/services/log/operationLogController';
import { OperationStatusEnumMap } from '@/enums/OperationStatusEnum';
import ViewOperationLogModal from './components/ViewOperationLogModal';

/**
 * 操作日志页面
 */
const OperationLog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.OperationLogVO[]>([]);

  /**
   * 删除日志
   * @param record
   */
  const handleDelete = async (record: API.OperationLogVO) => {
    const hide = message.loading('正在删除');
    if (!record?.id) return true;
    try {
      await deleteOperationLog({ id: record.id as any });
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
  const handleBatchDelete = async (selectedRows: API.OperationLogVO[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows?.length) return true;
    try {
      await Promise.all(selectedRows.map((row) => deleteOperationLog({ id: row.id as any })));
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

  const columns: ProColumns<API.OperationLogVO>[] = [
    { title: '操作者ID', dataIndex: 'operatorId', width: 120, copyable: true, hideInTable: true },
    { title: '操作人', dataIndex: 'operatorName', width: 120 },
    { title: '模块', dataIndex: 'module', width: 120 },
    { title: '操作类型', dataIndex: 'action', width: 100 },
    {
      title: '请求方法',
      dataIndex: 'method',
      width: 100,
      render: (method) => method && <Tag color="blue">{method}</Tag>,
    },
    { title: '请求路径', dataIndex: 'path', ellipsis: true },
    { title: 'IP地址', dataIndex: 'clientIp', width: 120 },
    {
      title: '状态',
      dataIndex: 'success',
      width: 100,
      valueEnum: OperationStatusEnumMap,
      render: (success) => {
        return Number(success) === 1 ? (
          <Badge status="success" text="成功" />
        ) : (
          <Badge status="error" text="失败" />
        );
      },
    },
    {
      title: '操作时间',
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
          <ViewOperationLogModal record={record}>
            <Typography.Link key="view" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewOperationLogModal>
          <Popconfirm
            title="确定删除此记录吗？"
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
      <ProTable<API.OperationLogVO>
        headerTitle="操作日志"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listLogByPage({
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
        scroll={{ x: 1200 }}
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

export default OperationLog;
