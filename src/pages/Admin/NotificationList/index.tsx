import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Badge, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {
  batchDeleteNotification,
  deleteNotification,
  listNotificationByPage,
} from '@/services/notification/notificationController';
import UpdateNotificationModal from '@/pages/Admin/NotificationList/components/UpdateNotificationModal';
import CreateNotificationModal from '@/pages/Admin/NotificationList/components/CreateNotificationModal';
import ViewNotificationModal from '@/pages/Admin/NotificationList/components/ViewNotificationModal';
import { NotificationTypeEnumMap } from '@/enums/NotificationTypeEnum';
import { NotificationReadStatusEnumMap } from '@/enums/NotificationReadStatusEnum';

const NotificationList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Notification>();
  const [selectedRowsState, setSelectedRows] = useState<API.Notification[]>([]);

  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.Notification) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deleteNotification({ id: row.id as any });
      if (res.code === 0) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error(`删除失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 批量删除节点
   * @param selectedRows
   */
  const handleBatchDelete = async (selectedRows: API.Notification[]) => {
    if (!selectedRows?.length) return;
    const hide = message.loading('正在删除');
    try {
      const res = await batchDeleteNotification({
        ids: selectedRows.map((row) => row.id!),
      });
      if (res.code === 0) {
        message.success('批量删除成功');
        actionRef.current?.reloadAndRest?.();
        setSelectedRows([]);
      } else {
        message.error(`批量删除失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`批量删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };


  /**
   * 表格列定义
   */
  const columns: ProColumns<API.Notification>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'index',
      width: 48,
      hideInTable: true,
    },
    {
      title: '通知ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '用户 ID',
      dataIndex: 'userId',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
      ellipsis: true,
      width: 140,
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'text',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '通知类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: NotificationTypeEnumMap,
      width: 110,
    },
    {
      title: '已读状态',
      dataIndex: 'isRead',
      valueType: 'select',
      valueEnum: NotificationReadStatusEnumMap,
      width: 110,
      render: (isRead) => {
        if (isRead === 1) return <Badge status="success" text="已读" />;
        return <Badge status="processing" text="未读" />;
      },
    },
    {
      title: '关联信息',
      dataIndex: 'related',
      hideInSearch: true,
      render: (_, record) => {
        if (!record.relatedType) return '-';
        return <Tag color="processing">{record.relatedType}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 160,
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <ViewNotificationModal notification={record}>
            <Typography.Link key="view" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined /> 查看
            </Typography.Link>
          </ViewNotificationModal>
          <Typography.Link
            key="update"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            <EditOutlined /> 修改
          </Typography.Link>
          <Popconfirm
            title="确定删除此通知吗？"
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
      <ProTable<API.Notification, API.NotificationQueryRequest>
        headerTitle="通知管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            创建通知
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listNotificationByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.NotificationQueryRequest);

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
          <Space>
            <Popconfirm
              key="batchDelete"
              title="确定批量删除？"
              description="删除后将无法恢复？"
              onConfirm={() => handleBatchDelete(selectedRowsState)}
            >
              <Button danger type="primary">
                批量删除
              </Button>
            </Popconfirm>
          </Space>
        </FooterToolbar>
      )}
      <CreateNotificationModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />
      <UpdateNotificationModal
        visible={updateModalVisible}
        oldData={currentRow}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </>
  );
};

export default NotificationList;
