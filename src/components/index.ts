/**
 * 布局组件
 * 这个文件作为组件的目录
 * 目的是统一管理对外输出的组件，方便分类
 */
import Footer from './Footer';
import { AvatarDropdown, AvatarName } from './RightContent/AvatarDropdown';

import { UserCard } from '@/components/ReUser';
import { ActionTabbar, PostAvatarCard, PostCard, PostTitleCard } from '@/components/RePost';
import { MarkdownEditor, MarkdownViewer } from './Markdown';

export {
  Footer,
  AvatarDropdown,
  AvatarName,
  PostCard,
  ActionTabbar,
  UserCard,
  PostAvatarCard,
  PostTitleCard,
  MarkdownViewer,
  MarkdownEditor,
};
