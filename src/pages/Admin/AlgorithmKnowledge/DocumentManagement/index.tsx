import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Typography, Avatar, Tag, Tooltip } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { useParams, history } from '@umijs/max';
import {
  deleteDocument,
  listDocumentVoByPage,
} from '@/services/ai/documentController';
import { getKnowledgeBaseVoById } from '@/services/ai/knowledgeBaseController';
import UploadDocumentModal from '../KnowledgeBaseList/components/UploadDocumentModal';
import { DocumentParseStatusEnumMap } from '@/enums/DocumentParseStatusEnum';
import {
  CloudUploadOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import DocumentChunkDrawer from '../KnowledgeBaseList/components/DocumentChunkDrawer';

/**
 * 格式化文件大小
 * @param size
 */
const formatFileSize = (size?: number) => {
  if (!size) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return `${parseFloat((size / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * 文档管理页面
 * @constructor
 */
const DocumentManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const knowledgeBaseId = id as any;
  const actionRef = useRef<ActionType>();
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.DocumentVO>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<API.KnowledgeBaseVO>();
  const [chunkDrawerVisible, setChunkDrawerVisible] = useState<boolean>(false);

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
   * 删除文档
   * @param id
   */
  const handleDelete = async (id: any) => {
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
  const handleBatchDelete = async (ids: any[]) => {
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
  const columns: ProColumns<API.DocumentVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '文件名',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
      minWidth: 200,
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      valueType: 'text',
      hideInSearch: true,
      width: 100,
      render: (_, record) => formatFileSize(record.fileSize),
    },
    {
      title: '分片数量',
      dataIndex: 'chunkCount',
      valueType: 'digit',
      hideInSearch: true,
      sorter: true,
      align: 'center',
      width: 100,
      render: (count) => (
        <Tag color={Number(count) > 0 ? 'processing' : 'default'} style={{ borderRadius: '10px' }}>
          {count}
        </Tag>
      ),
    },
    {
      title: '解析状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: DocumentParseStatusEnumMap,
      width: 120,
      sorter: true,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 180,
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setChunkDrawerVisible(true);
            }}
          >
            <FileSearchOutlined /> 分片
          </Typography.Link>
          <Popconfirm
            title="确定删除此文档及关联分片吗？"
            description="删除后将无法恢复。"
            onConfirm={() => handleDelete(record.id as any)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link type="danger">
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
        title: `文档管理`,
        subTitle: knowledgeBase?.name,
        onBack: () => history.back(),
        extra: [
          <Tooltip key="tip" title="文档上传后将自动进入异步解析过程，解析完成后可进行召回分析">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.45)', cursor: 'help' }} />
          </Tooltip>
        ]
      }}
    >
      <ProTable<API.DocumentVO, API.DocumentQueryRequest>
        headerTitle="文档列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
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
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
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
        request={async (params) => {
          if (!knowledgeBaseId) return { success: false };
          const { data, code } = await listDocumentVoByPage({
            ...params,
            knowledgeBaseId: knowledgeBaseId as any,
          } as API.DocumentQueryRequest);

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

      <UploadDocumentModal
        knowledgeBaseId={knowledgeBaseId}
        visible={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        onSubmit={() => {
          setUploadModalVisible(false);
          actionRef.current?.reload();
        }}
      />

      <DocumentChunkDrawer
        documentId={currentRow?.id}
        visible={chunkDrawerVisible}
        onClose={() => {
          setChunkDrawerVisible(false);
          setCurrentRow(undefined);
        }}
      />
    </PageContainer>
  );
};

export default DocumentManagement;
