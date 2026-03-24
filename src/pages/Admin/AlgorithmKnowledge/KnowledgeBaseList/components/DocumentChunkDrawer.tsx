import { Drawer, Empty } from 'antd';
import React from 'react';

interface Props {
  documentId?: number;
  visible: boolean;
  onClose: () => void;
}

/**
 * 文档分片详情抽屉 (功能暂未开放)
 * @param props
 * @constructor
 */
const DocumentChunkDrawer: React.FC<Props> = (props) => {
  const { visible, onClose } = props;

  return (
    <Drawer
      title="文档分片详情"
      width={800}
      open={visible}
      onClose={onClose}
      destroyOnClose
    >
      <Empty
        description={
          <span>
            文档分片管理功能正在开发中，敬请期待
          </span>
        }
        style={{ marginTop: 100 }}
      />
    </Drawer>
  );
};

export default DocumentChunkDrawer;
