import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';
import { deleteUser, listUserByPage } from '@/services/user/userController';
import { batchUpsertUser } from '@/services/search/searchController';
import { Avatar, Badge, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { userRole } from '@/enums/UserRoleEnum';
import CreateUserModal from '@/pages/Admin/UserList/components/CreateUserModal';
import UpdateUserModal from '@/pages/Admin/UserList/components/UpdateUserModal';
import ViewUserModal from '@/pages/Admin/UserList/components/ViewUserModal';


/**
 * 用户管理列表
 * @constructor
 */
const UserList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.User>();
  const [selectedRowsState, setSelectedRows] = useState<API.User[]>([]);

  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.User) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deleteUser({ id: row.id as any });
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
  const handleBatchDelete = async (selectedRows: API.User[]) => {
    if (!selectedRows?.length) return;
    const hide = message.loading('正在删除');
    try {
      const res = await Promise.all(selectedRows.map((row) => deleteUser({ id: row.id as any })));
      if (res.every((r) => r.code === 0)) {
        message.success('批量删除成功');
        actionRef.current?.reloadAndRest?.();
        setSelectedRows([]);
      } else {
        message.error('部分内容删除失败');
      }
    } catch (error: any) {
      message.error(`批量删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 批量同步到 ES
   * @param selectedRows
   */
  const handleBatchSyncToEs = async (selectedRows: API.User[]) => {
    if (!selectedRows?.length) return;
    const hide = message.loading('正在同步到 ES');
    try {
      const res = await batchUpsertUser(selectedRows as API.UserEsDTO[]);
      if (res.code === 0) {
        message.success('同步到 ES 成功');
      } else {
        message.error(`同步失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`同步报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
      copyable: true,
      ellipsis: true,
      width: 140,
    },

    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
      render: (text, record) => (
        <Space>
          <Avatar src={record.userAvatar} size="small">
            {record.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'userEmail',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'userPhone',
      valueType: 'text',
      copyable: true,
      hideInSearch: true,
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: 'GitHub',
      dataIndex: 'githubLogin',
      hideInSearch: true,
      render: (_, record) =>
        record.githubLogin ? (
          <Typography.Link href={record.githubUrl} target="_blank" rel="noreferrer">
            {record.githubLogin}
          </Typography.Link>
        ) : (
          '-'
        ),
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: userRole,
      render: (_, record) => {
        const role = record.userRole;
        if (role === 'admin') {
          return <Badge status="error" text="管理员" />;
        }
        return <Badge status="default" text="普通用户" />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      sorter: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <ViewUserModal user={record}>
            <Typography.Link key="view" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewUserModal>
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
            title="确定删除此用户吗？"
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
      <ProTable<API.User, API.UserQueryRequest>
        headerTitle="用户管理"
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
            新建
          </Button>,
        ]}

        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listUserByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.UserQueryRequest);

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
            <Button type="primary" onClick={() => handleBatchSyncToEs(selectedRowsState)}>
              同步到 ES
            </Button>
            <Popconfirm
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


      <CreateUserModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />

      <UpdateUserModal
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

export default UserList;
