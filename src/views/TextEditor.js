import React, { useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";



export default function TextEditor(props) {

    var editor = useRef(null);
    const { inialvalue, setText } = props;
    const config = {};

    return useMemo(() => {
        return (<JoditEditor
            ref={editor}
            value={inialvalue}
            onChange={(data) => setText(data)}
            config={config}
        />)
    }, [])








}