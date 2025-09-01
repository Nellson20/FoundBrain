import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HTML2BBCodeLib from 'html2bbcode';

var HTML2BBCode = HTML2BBCodeLib.HTML2BBCode;

const TextEditor = ({ onChange = () => {}, value = '' }) => {
  const converter = new HTML2BBCode();

  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ],
  }), []);

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
  ];

  const handleChange = (html, delta, source, editor) => {
    onChange({
      text: editor.getText(),
      html: html,
      bbcode: converter.convert(converter.parse(html))
    });
  };

  return (
    <div className="text-editor" style={{ borderRadius: 5 }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="La description du poste..."
      />
    </div>
  );
};

export default TextEditor;
