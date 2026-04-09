import {
  BarChartOutlined,
  BookOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
  StatisticCard,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Avatar, Button, Dropdown, message, Modal, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteKnowledgeBase, listMyKnowledgeBaseVoByPage, } from '@/services/ai/knowledgeBaseController';
import CreateKnowledgeModal from '@/pages/Admin/AlgorithmKnowledge/KnowledgeBaseList/components/CreateKnowledgeModal';
import UpdateKnowledgeModal from '@/pages/Admin/AlgorithmKnowledge/KnowledgeBaseList/components/UpdateKnowledgeModal';

/**
 * 算法知识管理 (AI 知识库)
 * @constructor
 */
const AlgorithmKnowledgeList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.KnowledgeBaseVO>();
  const [totalKnowledgeBase, setTotalKnowledgeBase] = useState<number>(0);
  const [totalDocuments, setTotalDocuments] = useState<number>(0);

  /**
   * 删除知识库
   * @param row
   */
  const handleDelete = async (row: API.KnowledgeBaseVO) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deleteKnowledgeBase({ id: row.id as any });
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
   * 表格列定义
   */
  const columns: ProColumns<API.KnowledgeBaseVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '知识库名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
      formItemProps: {
        rules: [{ required: true, message: '知识库名称为必填项' }],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: 'userVO',
      valueType: 'text',
      hideInSearch: true,
      width: 150,
      render: (_, record) => (
        <Space>
          <Avatar
            src={record.userVO?.userAvatar}
            size="small"
            style={{ backgroundColor: '#1677ff', verticalAlign: 'middle' }}
          >
            {record.userVO?.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text ellipsis style={{ maxWidth: 100 }}>
            {record.userVO?.userName || '未知'}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: '文档数量',
      dataIndex: 'documentCount',
      valueType: 'digit',
      hideInSearch: true,
      sorter: true,
      align: 'center',
      width: 100,
      render: (count) => (
        <Tag
          color={Number(count) > 0 ? 'processing' : 'default'}
          style={{ borderRadius: 6, padding: '2px 12px', fontWeight: 500 }}
        >
          {count || 0}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInTable: true,
      sorter: true,
      width: 180,
      render: (dom) => (
        <Typography.Text type="secondary" style={{ fontSize: '13px' }}>
          {dom}
        </Typography.Text>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            key="manage"
            onClick={() => {
              history.push(`/admin/algorithm/knowledge/document/${record.id}`);
            }}
          >
            <FileTextOutlined /> 管理
          </Typography.Link>
          <Typography.Link
            key="retrieval"
            onClick={() => {
              history.push(`/admin/algorithm/knowledge/retrieval/${record.id}`);
            }}
          >
            <SearchOutlined /> 检索
          </Typography.Link>
          <Typography.Link
            key="analysis"
            onClick={() => {
              history.push(`/admin/algorithm/knowledge/recall-analysis/${record.id}`);
            }}
          >
            <BarChartOutlined /> 召回分析
          </Typography.Link>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'update',
                  label: '编辑信息',
                  icon: <EditOutlined />,
                  onClick: () => {
                    setCurrentRow(record);
                    setUpdateModalVisible(true);
                  },
                },
                {
                  type: 'divider',
                },
                {
                  key: 'delete',
                  label: '删除库',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => {
                    Modal.confirm({
                      title: '确认删除该知识库？',
                      content: '删除后，关联的文档和分片也将一并删除，该操作不可恢复。',
                      okText: '确认',
                      cancelText: '取消',
                      okButtonProps: { danger: true },
                      onOk: () => handleDelete(record),
                    });
                  },
                },
              ],
            }}
          >
            <Typography.Link>
              更多 <DownOutlined />
            </Typography.Link>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '算法知识管理',
        breadcrumb: {},
      }}
    >
      <StatisticCard.Group direction="row" gutter={16} style={{ marginBottom: 24 }}>
        <StatisticCard
          statistic={{
            title: '全部知识库',
            value: totalKnowledgeBase,
            icon: <BookOutlined style={{ color: '#1890ff' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '关联文档总数',
            value: totalDocuments,
            icon: <FileTextOutlined style={{ color: '#52c41a' }} />,
          }}
        />
        <StatisticCard
          statistic={{
            title: '活跃状态',
            value: '良好',
            status: 'success',
            icon: <ThunderboltOutlined style={{ color: '#faad14' }} />,
          }}
        />
      </StatisticCard.Group>
      <ProTable<API.KnowledgeBaseVO, API.KnowledgeBaseQueryRequest>
        headerTitle="知识库列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button
            key="refresh"
            icon={<ReloadOutlined />}
            onClick={() => actionRef.current?.reload()}
          >
            刷新
          </Button>,
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
            style={{ borderRadius: 6 }}
          >
            新建库
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listMyKnowledgeBaseVoByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.KnowledgeBaseQueryRequest);

          if (code === 0) {
            setTotalKnowledgeBase(Number(data?.total) || 0);
            const docsCount = data?.records?.reduce((acc, curr) => acc + (curr.documentCount || 0), 0) || 0;
            setTotalDocuments(docsCount); // This is just for current page, but gives a sense of density
          }

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        scroll={{ x: 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
      />
      <CreateKnowledgeModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />
      <UpdateKnowledgeModal
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
    </PageContainer>
  );
};

export default AlgorithmKnowledgeList;
