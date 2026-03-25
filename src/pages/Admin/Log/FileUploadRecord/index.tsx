import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Image, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteFileUploadRecord, listRecordByPage, } from '@/services/log/fileUploadRecordController';
import { FileUploadStatusEnumMap } from '@/enums/FileUploadStatusEnum';
import ViewFileUploadRecordModal from './components/ViewFileUploadRecordModal';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';

/**
 * 文件上传记录页面
 */
const FileUploadRecord: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * 删除记录
   * @param id
   */
  const handleDelete = async (id: any) => {
    const hide = message.loading('正在删除');
    try {
      await deleteFileUploadRecord({ id: id as any });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error: any) {
      message.error(`删除失败: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 批量删除记录
   * @param ids
   */
  const handleBatchDelete = async (ids: React.Key[]) => {
    const hide = message.loading('正在批量删除');
    try {
      await Promise.all(ids.map((id) => deleteFileUploadRecord({ id: id as any })));
      message.success('批量删除成功');
      setSelectedRowKeys([]);
      actionRef.current?.reloadAndRest?.();
    } catch (error: any) {
      message.error(`批量删除失败: ${error.message}`);
    } finally {
      hide();
    }
  };

  const columns: ProColumns<API.FileUploadRecordVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '预览',
      dataIndex: 'url',
      width: 80,
      hideInSearch: true,
      render: (url, record) => {
        if (!url) return '-';
        const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url as string);
        if (isImage) {
          return (
            <Image
              src={url as string}
              width={40}
              height={40}
              style={{ objectFit: 'cover', borderRadius: 4 }}
              preview={{ mask: <EyeOutlined /> }}
            />
          );
        }
        return (
          <Typography.Link href={url as string} target="_blank">
            查看
          </Typography.Link>
        );
      },
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      ellipsis: true,
      minWidth: 150,
    },
    {
      title: '结果类型',
      dataIndex: 'bizType',
      width: 120,
      render: (bizType) => {
        const type = bizType as string;
        const colorMap: Record<string, string> = {
          [FileUploadBiz.USER_AVATAR]: 'blue',
          [FileUploadBiz.POST_COVER]: 'cyan',
          [FileUploadBiz.POST_IMAGE_COVER]: 'purple',
        };
        const textMap: Record<string, string> = {
          [FileUploadBiz.USER_AVATAR]: '用户头像',
          [FileUploadBiz.POST_COVER]: '帖子封面',
          [FileUploadBiz.POST_IMAGE_COVER]: '图片封面',
        };
        return <Tag color={colorMap[type] || 'default'}>{textMap[type] || type}</Tag>;
      },
    },
    {
      title: '大小',
      dataIndex: 'fileSize',
      width: 100,
      hideInSearch: true,
      render: (size) => {
        const s = Number(size);
        if (isNaN(s)) return '-';
        if (s < 1024) return `${s} B`;
        if (s < 1024 * 1024) return `${(s / 1024).toFixed(2)} KB`;
        return `${(s / (1024 * 1024)).toFixed(2)} MB`;
      },
    },
    {
      title: '后缀',
      dataIndex: 'fileSuffix',
      width: 80,
      hideInSearch: true,
      render: (suffix) =>
        suffix && (
          <Tag color="blue" style={{ border: 'none' }}>
            {suffix as string}
          </Tag>
        ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: FileUploadStatusEnumMap,
    },
    {
      title: '上传时间',
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
          <ViewFileUploadRecordModal record={record}>
            <Typography.Link key="view">
              <EyeOutlined /> 详情
            </Typography.Link>
          </ViewFileUploadRecordModal>
          <Popconfirm
            title="确定删除此上传记录吗？"
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
        title: '文件上传记录',
        breadcrumb: {},
      }}
    >
      <ProTable<API.FileUploadRecordVO, API.FileUploadRecordQueryRequest>
        headerTitle="上传历史"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listRecordByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.FileUploadRecordQueryRequest);

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

export default FileUploadRecord;
