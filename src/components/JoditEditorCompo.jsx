import JoditEditor from 'jodit-react';
import React from 'react'

const JoditEditorCompo =({ setJoditContent, joditContent }) => {
    const joditConfig = {
        readonly: false,
        height: 400,
        resize: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        toolbarAdaptive: false,
        buttons: "bold,italic,underline,|,ul,ol,|,table,link,image,|,align,left,center,right,justify,|,brush,eraser,|,paragraph,fontsize,|,undo,redo",
        allowHTML: true,
        useClasses: true,
    }
    return (
        <div>
            <JoditEditor
                value={joditContent}
                config={joditConfig}
                onBlur={(content) => setJoditContent(content)}
            />
        </div>
    )
}

export default React.memo(JoditEditorCompo);