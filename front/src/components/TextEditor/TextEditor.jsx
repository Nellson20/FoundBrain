
import React, { useEffect, useState } from 'react';
import "./TextEditor.scss"
import { useQuill } from 'react-quilljs';
import htmlbbcode from 'htmlbbcode'

// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
var HTML2BBCode = require('html2bbcode').HTML2BBCode

const TextEditor = ({onChange=()=>{},value=''}) => {
    const theme = 'snow';
    // const theme = 'bubble';
    
    const [modules,setModules] = useState({
      toolbar: [
        ['bold', 'italic'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ],
    })
  
    const [formats,setFormats] = useState([
      'bold', 'italic', 'underline', 'strike',
      'list', 'bullet', 'indent',
     
    ])
  
    const placeholder = 'La déscription du poste...';
  
  
  
    const { quill,quillRef } = useQuill({ theme, modules, formats, placeholder });


    useEffect(() => {
        var converter = new HTML2BBCode()
        if (quill) {
          quill.on('text-change', (delta, oldDelta, source) => {
            
            onChange({text:quill.getText(),html:quill.root.innerHTML,bbcode:converter.convert(converter.parse(quill.root.innerHTML))})
          });
        }
      }, [quill]);
    


  return (
    <div className='text-editor' style={{borderRadius:5}}>
      <div ref={quillRef} />
    </div>
  );
};
export default TextEditor