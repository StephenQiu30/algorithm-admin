import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable, StatisticCard } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  RiseOutlined,
  SendOutlined,
} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { deleteEmailRecord, listRecordByPage1 } from '@/services/log/emailRecordController';
import { EmailStatusEnumMap } from '@/enums/EmailStatusEnum';
import ViewEmailRecordModal from './components/ViewEmailRecordModal';

/**
 * 邮件记录页面
 */
const EmailRecord: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.EmailRecordVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.EmailRecordVO[]>([]);
  const [totalEmails, setTotalEmails] = useState<number>(0);
  const [successCount, setSuccessCount] = useState<number>(0);

  /**
   * 删除记录
   * @param record
   */
  const handleDelete = async (record: API.EmailRecordVO) => {
    const hide = message.loading('正在删除');
    if (!record?.id) return true;
    try {
      await deleteEmailRecord({ id: record.id as any });
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
   * 批量删除记录
   * @param selectedRows
   */
  const handleBatchDelete = async (selectedRows: API.EmailRecordVO[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows?.length) return true;
    try {
      await Promise.all(selectedRows.map((row) => deleteEmailRecord({ id: row.id as any })));
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

  const columns: ProColumns<API.EmailRecordVO>[] = [
    { title: '记录ID', dataIndex: 'id', width: 120, copyable: true },
    { title: '业务ID', dataIndex: 'bizId', width: 120, ellipsis: true },
    { title: '收件人', dataIndex: 'toEmail', width: 180, copyable: true },
    { title: '主题', dataIndex: 'subject', ellipsis: true, width: 200 },
    {
      title: '业务类型',
      dataIndex: 'bizType',
      width: 120,
      render: (text) => text && <Tag color="blue">{text}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: EmailStatusEnumMap,
      render: (status) => {
        const s = status as string;
        if (s === 'SUCCESS') return <Badge status="success" text="成功" />;
        if (s === 'FAILED') return <Badge status="error" text="失败" />;
        return <Badge status="processing" text="正在发送" />;
      },
    },
    {
      title: '重试',
      dataIndex: 'retryCount',
      width: 60,
      hideInSearch: true,
      render: (count) => <Tag color={Number(count) > 0 ? 'warning' : 'default'}>{count}</Tag>,
    },
    { title: '发送渠道', dataIndex: 'provider', width: 100, hideInSearch: true },
    {
      title: '发送时间',
      dataIndex: 'sendTime',
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
          <ViewEmailRecordModal record={record}>
            <Typography.Link key="view" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewEmailRecordModal>
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
    <PageContainer
      header={{
        title: '邮件投递记录',
        breadcrumb: {},
      }}
    >
      <StatisticCard.Group direction="row" gutter={16} style={{ marginBottom: 24 }}>
        <StatisticCard
          statistic={{
            title: '总发送量',
            value: totalEmails,
            icon: <SendOutlined style={{ color: '#1890ff' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '发送成功',
            value: successCount,
            valueStyle: { color: '#52c41a' },
            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '成功率',
            value: totalEmails > 0 ? Math.floor((successCount / totalEmails) * 100) : 100,
            suffix: '%',
            status: totalEmails > 0 && successCount / totalEmails > 0.9 ? 'success' : 'warning',
            icon: <RiseOutlined style={{ color: '#eb2f96' }} />,
          }}
        />
      </StatisticCard.Group>
      <ProTable<API.EmailRecordVO>
        headerTitle="邮件记录"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listRecordByPage1({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          });

          if (code === 0) {
            setTotalEmails(Number(data?.total) || 0);
            const records = data?.records || [];
            const successes = records.filter(r => r.status === 'SUCCESS').length;
            setSuccessCount(successes);
          }

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
        scroll={{ x: 'max-content' }}
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
    </PageContainer>
  );
};

export default EmailRecord;
