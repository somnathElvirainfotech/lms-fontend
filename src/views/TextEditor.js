import React, { useRef } from "react";
import JoditEditor from "jodit-react";





export default function TextEditor({ setText, inialvalue }) {
    var editor = useRef(null);

    return <JoditEditor
        ref={editor}
        value={inialvalue}
        onChange={(data) => setText(data)}
        onBlur={(data) => setText(data)}
       
    />


    
    
      


}