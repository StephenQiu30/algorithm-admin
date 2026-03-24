import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { useParams, history } from '@umijs/max';
import {
  deleteDocument,
  listDocumentVoByPage as listKnowledgeDocumentVoByPage,
  retryIngest,
} from '@/services/ai/knowledgeDocumentController';
import { getKnowledgeBaseVoById } from '@/services/ai/knowledgeBaseController';
import UploadDocumentModal from '../KnowledgeBaseList/components/UploadDocumentModal';
import UpdateDocumentModal from '../KnowledgeBaseList/components/UpdateDocumentModal';
import DocumentChunkDrawer from '../KnowledgeBaseList/components/DocumentChunkDrawer';
import DocumentPreviewDrawer from '../KnowledgeBaseList/components/DocumentPreviewDrawer';
import { DocumentParseStatusEnum, DocumentParseStatusEnumMap } from '@/enums/DocumentParseStatusEnum';
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  ProfileOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

/**
 * 文档管理页面
 * @constructor
 */
const DocumentManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const knowledgeBaseId = Number(id);
  const actionRef = useRef<ActionType>();
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [chunkDrawerVisible, setChunkDrawerVisible] = useState<boolean>(false);
  const [previewDrawerVisible, setPreviewDrawerVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.KnowledgeDocumentVO>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<API.KnowledgeBaseVO>();
  const [shouldPoll, setShouldPoll] = useState<boolean>(false);

  /**
   * 获取知识库详情
   */
  useEffect(() => {
    if (knowledgeBaseId) {
      getKnowledgeBaseVoById({ id: knowledgeBaseId }).then((res) => {
        if (res.code === 0) {
          setKnowledgeBase(res.data);
        }
      });
    }
  }, [knowledgeBaseId]);

  /**
   * 轮询处理中的文档
   */
  useEffect(() => {
    let timer: any;
    if (shouldPoll) {
      timer = setInterval(() => {
        actionRef.current?.reload();
      }, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [shouldPoll]);

  /**
   * 重试文档解析
   * @param documentId
   */
  const handleRetry = async (documentId: number) => {
    const hide = message.loading('正在重新提交解析请求...');
    try {
      const res = await retryIngest({ documentId });
      if (res.code === 0) {
        message.success('已重新提交解析请求');
        actionRef.current?.reload();
      } else {
        message.error(`重试失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`重试报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 删除文档
   * @param id
   */
  const handleDelete = async (id: number) => {
    const hide = message.loading('正在删除...');
    try {
      const res = await deleteDocument({ id });
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
   * 批量删除文档
   * @param ids
   */
  const handleBatchDelete = async (ids: number[]) => {
    const hide = message.loading('正在批量删除...');
    try {
      const results = await Promise.all(ids.map((id) => deleteDocument({ id })));
      const successCount = results.filter((res) => res.code === 0).length;
      if (successCount === ids.length) {
        message.success('批量删除成功');
      } else {
        message.warning(`操作完成，成功 ${successCount} 个，失败 ${ids.length - successCount} 个`);
      }
      setSelectedRowKeys([]);
      actionRef.current?.reload();
    } catch (error: any) {
      message.error(`批量删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.KnowledgeDocumentVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      width: 60,
    },
    {
      title: '文件名',
      dataIndex: 'originalName',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
      minWidth: 200,
    },
    {
      title: '文件大小',
      dataIndex: 'sizeBytes',
      valueType: 'text',
      hideInSearch: true,
      width: 100,
      render: (_, record) => {
        if (!record.sizeBytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(record.sizeBytes) / Math.log(k));
        return parseFloat((record.sizeBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      },
    },
    {
      title: '解析状态',
      dataIndex: 'parseStatus',
      valueType: 'select',
      valueEnum: DocumentParseStatusEnumMap,
      width: 100,
      render: (status: any, record) => {
        const statusValue = Number(status);
        const config = DocumentParseStatusEnumMap[statusValue as keyof typeof DocumentParseStatusEnumMap] || {
          text: '未知',
          status: 'default',
        };
        return (
          <Space direction="vertical" size={0}>
            <Badge status={config.status.toLowerCase() as any} text={config.text} />
            {statusValue === DocumentParseStatusEnum.FAILED && record.errorMsg && (
              <Typography.Text type="danger" style={{ fontSize: 12 }}>
                {record.errorMsg}
              </Typography.Text>
            )}
          </Space>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 320,
      render: (_, record) => (
        <Space size="middle" wrap>
          <Typography.Link
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            <EditOutlined /> 编辑
          </Typography.Link>
          {record.parseStatus === DocumentParseStatusEnum.FAILED && (
            <Typography.Link
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={() => handleRetry(record.id as any)}
            >
              <ReloadOutlined /> 重试
            </Typography.Link>
          )}
          <Typography.Link
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setChunkDrawerVisible(true);
            }}
          >
            <ProfileOutlined /> 查看分片
          </Typography.Link>
          <Typography.Link
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => {
              setCurrentRow(record);
              setPreviewDrawerVisible(true);
            }}
          >
            <FileSearchOutlined /> 预览内容
          </Typography.Link>
          <Popconfirm
            title="确定删除此文档及关联分片吗？"
            description="删除后将无法恢复。"
            onConfirm={() => handleDelete(record.id as any)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link
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
        title: `文档管理 - ${knowledgeBase?.name || '加载中...'}`,
        onBack: () => history.back(),
      }}
    >
      <ProTable<API.KnowledgeDocumentVO, API.KnowledgeDocumentQueryRequest>
        headerTitle="文档列表"
        actionRef={actionRef}
        rowKey="id"
        size="middle"
        cardProps={{
          bodyStyle: { padding: '16px 24px' },
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
          span: {
            xs: 24,
            sm: 12,
            md: 8,
            lg: 8,
            xl: 8,
            xxl: 6,
          },
          searchText: '查询',
          resetText: '重置',
        }}
        toolBarRender={() => [
          <Button
            key="upload"
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={() => setUploadModalVisible(true)}
          >
            上传文档
          </Button>,
        ]}
        rowSelection={{
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        }}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={16}>
              <Popconfirm
                title="确定删除选中的所有文档吗？"
                description={`将删除选中的 ${selectedRowKeys.length} 个文档及关联分片，无法恢复。`}
                onConfirm={async () => {
                  await handleBatchDelete(selectedRowKeys as number[]);
                  onCleanSelected();
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button danger icon={<DeleteOutlined />}>
                  批量删除
                </Button>
              </Popconfirm>
              <Button onClick={onCleanSelected}>取消选择</Button>
            </Space>
          );
        }}
        request={async (params) => {
          if (!knowledgeBaseId) return { success: false };
          const { data, code } = await listKnowledgeDocumentVoByPage({
            ...params,
            knowledgeBaseId: knowledgeBaseId as any,
          } as API.KnowledgeDocumentQueryRequest);

          // 检查是否有正在处理中的文档
          const hasProcessing = data?.records?.some(
            (r) =>
              r.parseStatus === DocumentParseStatusEnum.PENDING ||
              r.parseStatus === DocumentParseStatusEnum.PROCESSING,
          );
          setShouldPoll(!!hasProcessing);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />

      <UploadDocumentModal
        knowledgeBaseId={knowledgeBaseId}
        visible={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        onSubmit={() => {
          setUploadModalVisible(false);
          actionRef.current?.reload();
        }}
      />

      <UpdateDocumentModal
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

      <DocumentChunkDrawer
        visible={chunkDrawerVisible}
        documentId={currentRow?.id as any}
        onClose={() => {
          setChunkDrawerVisible(false);
          setCurrentRow(undefined);
        }}
      />

      <DocumentPreviewDrawer
        visible={previewDrawerVisible}
        documentId={currentRow?.id as any}
        fileName={currentRow?.originalName}
        onClose={() => {
          setPreviewDrawerVisible(false);
          setCurrentRow(undefined);
        }}
      />
    </PageContainer>
  );
};

export default DocumentManagement;
