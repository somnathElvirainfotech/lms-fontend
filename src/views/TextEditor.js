import React, { useRef } from "react";
import JoditEditor from "jodit-react";
export default function TextEditor({ setText, inialvalue }) {
    var editor = useRef(null);
    var config = {
        buttons: ['source', '|', 'bold', 'italic', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph','left', 'center', 'right', 'justify', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'],
    }

    return <JoditEditor
        ref={editor}
        onChange={(data) => setText(data)}
        value={inialvalue}
        tabIndex={1}
    />
}