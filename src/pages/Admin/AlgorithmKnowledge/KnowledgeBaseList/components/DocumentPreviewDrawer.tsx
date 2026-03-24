import { Drawer, Empty } from 'antd';
import React from 'react';

interface Props {
  documentId?: number;
  visible: boolean;
  onClose: () => void;
  fileName?: string;
}

/**
 * 文档预览抽屉 (暂不可用)
 * @param props
 * @constructor
 */
const DocumentPreviewDrawer: React.FC<Props> = (props) => {
  const { visible, onClose, fileName } = props;

  return (
    <Drawer
      title={`预览: ${fileName || '文档内容'}`}
      placement="right"
      width="70%"
      onClose={onClose}
      open={visible}
      destroyOnClose
    >
      <Empty
        description={
          <span>
            文档内容预览功能正在开发中，敬请期待
          </span>
        }
        style={{ marginTop: 100 }}
      />
    </Drawer>
  );
};

export default DocumentPreviewDrawer;
