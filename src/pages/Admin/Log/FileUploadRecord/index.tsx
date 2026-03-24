import { ActionType, FooterToolbar, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Typography, Image } from 'antd';
import React, { useRef, useState } from 'react';
import {
  deleteFileUploadRecord,
  listRecordByPage,
} from '@/services/log/fileUploadRecordController';
import { FileUploadStatusEnumMap } from '@/enums/FileUploadStatusEnum';
import ViewFileUploadRecordModal from './components/ViewFileUploadRecordModal';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';

/**
 * 文件上传记录页面
 */
const FileUploadRecord: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.FileUploadRecordVO[]>([]);

  /**
   * 删除记录
   * @param record
   */
  const handleDelete = async (record: API.FileUploadRecordVO) => {
    const hide = message.loading('正在删除');
    if (!record?.id) return true;
    try {
      await deleteFileUploadRecord({ id: record.id as any });
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
  const handleBatchDelete = async (selectedRows: API.FileUploadRecordVO[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows?.length) return true;
    try {
      await Promise.all(selectedRows.map((row) => deleteFileUploadRecord({ id: row.id as any })));
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

  const columns: ProColumns<API.FileUploadRecordVO>[] = [
    { title: '记录ID', dataIndex: 'id', width: 120, copyable: true, hideInTable: true },
    { title: '用户ID', dataIndex: 'userId', width: 120, copyable: true },
    {
      title: '业务类型',
      dataIndex: 'bizType',
      width: 120,
      valueEnum: {
        [FileUploadBiz.USER_AVATAR]: { text: '用户头像', status: 'Default' },
        [FileUploadBiz.POST_COVER]: { text: '帖子封面', status: 'Default' },
        [FileUploadBiz.POST_IMAGE_COVER]: { text: '图片帖子封面', status: 'Default' },
      },
    },
    { title: '文件名', dataIndex: 'fileName', ellipsis: true },
    {
      title: '大小',
      dataIndex: 'fileSize',
      width: 100,
      hideInSearch: true,
      render: (size) => {
        const s = Number(size);
        if (s < 1024) return `${s} B`;
        if (s < 1024 * 1024) return `${((s as number) / 1024).toFixed(2)} KB`;
        return `${((s as number) / (1024 * 1024)).toFixed(2)} MB`;
      },
    },
    { title: '后缀', dataIndex: 'fileSuffix', width: 80, hideInSearch: true },
    {
      title: '预览',
      dataIndex: 'url',
      width: 100,
      hideInSearch: true,
      render: (url) => {
        if (!url) return '-';
        const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url as string);
        if (isImage) {
          return (
            <Image src={url as string} width={40} height={40} style={{ objectFit: 'cover' }} />
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
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: FileUploadStatusEnumMap,
    },
    { title: 'MD5', dataIndex: 'md5', hideInTable: true, hideInSearch: true },
    { title: 'IP地址', dataIndex: 'clientIp', hideInTable: true, hideInSearch: true },
    {
      title: '时间',
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
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <ViewFileUploadRecordModal record={record}>
            <Typography.Link key="view">详情</Typography.Link>
          </ViewFileUploadRecordModal>
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复？"
            onConfirm={() => handleDelete(record)}
          >
            <Typography.Link key="delete" type="danger">
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.FileUploadRecordVO>
        headerTitle="文件上传记录"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listRecordByPage({
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
    </>
  );
};

export default FileUploadRecord;
