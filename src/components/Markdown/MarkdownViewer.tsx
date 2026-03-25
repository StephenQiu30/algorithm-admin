import { MarkdownEditor } from '@ant-design/md-editor';
import React from 'react';
import './Markdown.css';

interface Props {
  value?: string;
}

/**
 * Markdown 展示组件
 *
 * @param props
 * @constructor
 */
const MarkdownViewer: React.FC<Props> = (props) => {
  const { value = '' } = props;

  return (
    <div className="markdown-viewer">
      <MarkdownEditor initValue={value} readonly={true} toc={false} />
    </div>
  );
};

export default MarkdownViewer;
