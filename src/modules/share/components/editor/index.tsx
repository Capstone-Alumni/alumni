import dynamic from 'next/dynamic';
import { EditorProps } from './Editor';

const Editor = dynamic(import('./Editor'), { ssr: false });
const EditorPreview = dynamic(import('./EditorPreview'), { ssr: false });

export { Editor, EditorPreview };

export type { EditorProps };
