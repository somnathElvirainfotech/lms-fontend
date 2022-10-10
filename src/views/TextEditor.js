import React, { useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";



export default function TextEditor(props) {

    var [ss, SS] = useState();

    var editor = useRef(null);
    const { inialvalue, setText } = props;
    const config = {

    };

    return useMemo(() => {
        return (<JoditEditor
            ref={editor}
            value={ss}
            onChange={(data) => SS(data)}
            config={config}
        />)
    }, [])








}