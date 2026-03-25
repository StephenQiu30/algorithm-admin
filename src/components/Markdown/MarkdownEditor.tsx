import { MarkdownEditor as AntdMarkdownEditor } from '@ant-design/md-editor';
import React from 'react';
import './Markdown.css';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: number;
}

/**
 * Markdown 编辑器组件
 *
 * @param props
 * @constructor
 */
const MarkdownEditor: React.FC<Props> = (props) => {
  const { value, onChange, placeholder, height = 400 } = props;

  return (
    <div className="markdown-editor-container">
      <AntdMarkdownEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder || '在此输入 Markdown 内容...'}
        editorProps={{
          style: { height: height, borderRadius: 8 },
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
