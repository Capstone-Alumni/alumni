'use client';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';

const QuillEditor = ({ placeholder }: { placeholder?: string }) => {
  const toolbarOptions = [
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme

    ['clean'], // remove formatting button
    ['link', 'image'],
  ];

  const theme = 'snow';
  const modules = {
    toolbar: toolbarOptions,
  };
  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    placeholder,
  });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const currrentContents = quill.getContents();
        console.log(
          '🚀 ~ file: QuillEditor.tsx:43 ~ quill.on ~ currrentContents',
          currrentContents,
        );
      });
    }
  }, [quill, Quill]);

  return (
    <div style={{ width: '100%', height: 500, marginBottom: '48px' }}>
      <div ref={quillRef} />
    </div>
  );
};

export default QuillEditor;
