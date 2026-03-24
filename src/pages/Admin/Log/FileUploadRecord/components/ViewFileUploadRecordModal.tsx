import { ModalForm, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Button, Image } from 'antd';
import React from 'react';
import { FileUploadStatusEnumMap } from '@/enums/FileUploadStatusEnum';

interface Props {
  record: API.FileUploadRecordVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.FileUploadRecordVO>[];
}

/**
 * 文件上传记录详情
 */
const ViewFileUploadRecordModal: React.FC<Props> = (props) => {
  const { record, children, columns } = props;

  const defaultColumns: ProDescriptionsItemProps<API.FileUploadRecordVO>[] = [
    { title: '记录ID', dataIndex: 'id' },
    { title: '用户ID', dataIndex: 'userId' },
    { title: '业务类型', dataIndex: 'bizType' },
    { title: '文件名', dataIndex: 'fileName', span: 2 },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      render: (size) => {
        const s = Number(size);
        if (s < 1024) return `${s} B`;
        if (s < 1024 * 1024) return `${(s / 1024).toFixed(2)} KB`;
        return `${(s / (1024 * 1024)).toFixed(2)} MB`;
      },
    },
    { title: '文件后缀', dataIndex: 'fileSuffix' },
    { title: '内容类型', dataIndex: 'contentType', span: 2 },
    { title: '存储类型', dataIndex: 'storageType' },
    { title: '存储桶', dataIndex: 'bucket' },
    { title: '对象键', dataIndex: 'objectKey', span: 2 },
    {
      title: '访问URL',
      dataIndex: 'url',
      span: 2,
      render: (url) =>
        url ? (
          <a href={url as string} target="_blank" rel="noreferrer">
            {url as string}
          </a>
        ) : (
          '-'
        ),
    },
    {
      title: '预览',
      dataIndex: 'url',
      span: 2,
      hideInDescriptions:
        !record?.url || !['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(record.fileSuffix || ''),
      render: (url) => <Image src={url as string} width={200} />,
    },
    { title: '文件MD5', dataIndex: 'md5', span: 2 },
    { title: '客户端IP', dataIndex: 'clientIp' },
    {
      title: '上传状态',
      dataIndex: 'status',
      valueEnum: FileUploadStatusEnumMap,
    },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', span: 2 },
    {
      title: '错误信息',
      dataIndex: 'errorMessage',
      span: 2,
      hideInDescriptions: !record?.errorMessage,
      render: (text) => (
        <pre style={{ color: 'red', maxHeight: 200, overflow: 'auto' }}>{text}</pre>
      ),
    },
  ];

  return (
    <ModalForm
      title="文件上传记录详情"
      trigger={children}
      submitter={{
        render: (_, doms) => [
          <Button key="close" onClick={() => (doms[0] as any).props.onCancel?.()}>
            关闭
          </Button>,
        ],
      }}
      width={800}
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <ProDescriptions<API.FileUploadRecordVO>
        column={2}
        dataSource={record}
        columns={columns || defaultColumns}
      />
    </ModalForm>
  );
};

export default ViewFileUploadRecordModal;
