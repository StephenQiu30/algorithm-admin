import { Drawer, message, Spin, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { listDocumentChunkByPage } from '@/services/ai/documentChunkController';
import MarkdownViewer from '@/components/Markdown/MarkdownViewer';

interface Props {
  documentId?: number;
  visible: boolean;
  onClose: () => void;
  fileName?: string;
}

/**
 * 文档预览抽屉 (Markdown)
 * @param props
 * @constructor
 */
const DocumentPreviewDrawer: React.FC<Props> = (props) => {
  const { documentId, visible, onClose, fileName } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (visible && documentId) {
      loadContent();
    } else {
        setContent(''); // Clear content when hidden
    }
  }, [visible, documentId]);

  /**
   * 加载文档完整内容 (根据切片拼接)
   */
  const loadContent = async () => {
    setLoading(true);
    try {
      // 默认尝试获取前 1000 条切片 (覆盖绝大多数文档)
      const res = await listDocumentChunkByPage({
        documentId,
        current: 1,
        pageSize: 1000,
        sortField: 'chunkIndex',
        sortOrder: 'ascend',
      });
      if (res.code === 0) {
        // 二次排序确保顺序正确
        const sortedChunks = (res.data?.records || []).sort(
          (a, b) => (a.chunkIndex || 0) - (b.chunkIndex || 0),
        );
        const joinedContent = sortedChunks.map((chunk) => chunk.content).join('\n\n');
        setContent(joinedContent);
      } else {
        message.error(`获取内容失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`获取内容报错: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={`预览: ${fileName || '文档内容'}`}
      placement="right"
      width="70%"
      onClose={onClose}
      open={visible}
      destroyOnClose
      styles={{
        body: { padding: 0 },
      }}
    >
      <Spin spinning={loading} size="large" tip="正在加载内容...">
        <div style={{ padding: '24px', minHeight: '100%' }}>
          {content ? (
            <MarkdownViewer value={content} />
          ) : (
            !loading && (
              <Empty
                style={{ marginTop: 100 }}
                description="暂无内容，请确认文档是否解析成功"
              />
            )
          )}
        </div>
      </Spin>
    </Drawer>
  );
};

export default DocumentPreviewDrawer;
