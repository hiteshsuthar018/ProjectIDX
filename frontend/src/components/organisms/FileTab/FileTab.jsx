import React from 'react'
import { useFileTabStore } from '../../../store/fileTabStore'
import EditorButton from '../../atoms/EditorButton/EditorButton';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';

const FileTab = () => {
    const {files} = useFileTabStore();
     const {activeFileTab} = useActiveFileTabStore();
    console.log(files)
  return (
    <div className='flex'>
       {files.map((path)=>(
        <EditorButton key={path} isActive={activeFileTab.path===path?true:false} path={path}/>
       ))}
    </div>
  )
}

export default FileTab