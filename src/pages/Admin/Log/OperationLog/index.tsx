import {
  CheckCircleOutlined,
  ControlOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable, StatisticCard } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteOperationLog, listLogByPage } from '@/services/log/operationLogController';
import { OperationStatusEnumMap } from '@/enums/OperationStatusEnum';
import ViewOperationLogModal from './components/ViewOperationLogModal';

/**
 * 操作日志页面
 */
const OperationLog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalOps, setTotalOps] = useState<number>(0);
  const [successRate, setSuccessRate] = useState<number>(100);

  /**
   * 删除日志
   * @param id
   */
  const handleDelete = async (id: any) => {
    const hide = message.loading('正在删除');
    try {
      await deleteOperationLog({ id: id as any });
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
      await Promise.all(ids.map((id) => deleteOperationLog({ id: id as any })));
      message.success('批量删除成功');
      setSelectedRowKeys([]);
      actionRef.current?.reloadAndRest?.();
    } catch (error: any) {
      message.error(`批量删除失败: ${error.message}`);
    } finally {
      hide();
    }
  };

  const columns: ProColumns<API.OperationLogVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '操作人',
      dataIndex: 'operatorName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '模块',
      dataIndex: 'module',
      width: 120,
      ellipsis: true,
    },
    {
      title: '操作内容',
      dataIndex: 'action',
      width: 120,
      ellipsis: true,
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      width: 100,
      render: (method) => method && <Tag color="processing">{method}</Tag>,
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'success',
      width: 100,
      valueEnum: OperationStatusEnumMap,
      render: (_, record) => {
        const statusInfo = OperationStatusEnumMap[record.success as keyof typeof OperationStatusEnumMap];
        return <Badge status={statusInfo?.status as any} text={statusInfo?.text} />;
      },
    },
    {
      title: '操作时间',
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
          <ViewOperationLogModal record={record}>
            <Typography.Link key="view">
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewOperationLogModal>
          <Popconfirm
            title="确定删除此记录吗？"
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
        title: '操作日志',
        breadcrumb: {},
      }}
    >
      <StatisticCard.Group direction="row" gutter={16} style={{ marginBottom: 24 }}>
        <StatisticCard
          statistic={{
            title: '总操作数',
            value: totalOps,
            icon: <ControlOutlined style={{ color: '#1890ff' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '操作成功率',
            value: successRate,
            suffix: '%',
            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '运行状态',
            value: '正常',
            status: 'processing',
            icon: <PlayCircleOutlined style={{ color: '#13c2c2' }} />,
          }}
        />
      </StatisticCard.Group>
      <ProTable<API.OperationLogVO, API.OperationLogQueryRequest>
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

          const { data, code } = await listLogByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.OperationLogQueryRequest);

          if (code === 0) {
            setTotalOps(Number(data?.total) || 0);
            const records = data?.records || [];
            const successCount = records.filter((r) => Number(r.success) === 1).length;
            if (records.length > 0) {
              setSuccessRate(Math.floor((successCount / records.length) * 100));
            }
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

export default OperationLog;
