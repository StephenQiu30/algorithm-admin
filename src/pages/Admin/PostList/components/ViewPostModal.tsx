import { Modal, Button, Space, Tag } from 'antd';
import React, { useState } from 'react';
import { ProDescriptions, ProDescriptionsItemProps, ProCard } from '@ant-design/pro-components';
import { MarkdownViewer } from '@/components';
import { reviewStatus } from '@/enums/ReviewStatusEnum';

interface Props {
  post: API.PostVO;
  children?: React.ReactElement;
  columns?: ProDescriptionsItemProps<API.PostVO>[];
}

/**
 * 帖子详情 Modal
 */
const ViewPostModal: React.FC<Props> = (props) => {
  const { post, children, columns } = props;
  const [visible, setVisible] = useState(false);

  const defaultColumns: ProDescriptionsItemProps<API.PostVO>[] = [
    { title: '帖子ID', dataIndex: 'id', copyable: true },
    { title: '标题', dataIndex: 'title' },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (tags) => {
        const tagList: string[] = typeof tags === 'string' ? JSON.parse(tags || '[]') : tags || [];
        return (
          <Space wrap>
            {tagList.map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueEnum: reviewStatus,
    },
    { title: '创建人ID', dataIndex: 'userId', copyable: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
  ];

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setVisible(true),
        })}
      <Modal
        title="帖子详情"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="close" onClick={() => setVisible(false)}>
            关闭
          </Button>,
        ]}
        width={1000}
        destroyOnClose
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <ProDescriptions<API.PostVO>
            column={2}
            dataSource={post}
            columns={columns || defaultColumns}
          />
          <ProCard title="文章内容" bordered headerBordered bodyStyle={{ padding: 16 }}>
            <MarkdownViewer value={post?.content} />
          </ProCard>
        </Space>
      </Modal>
    </>
  );
};

export default ViewPostModal;
