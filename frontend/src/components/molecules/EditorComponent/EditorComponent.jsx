import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import useEditorSocketStore from "../../../store/editorSocketStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
const EditorComponent = () => {
    const [editorState , setEditorState] = useState({theme:null});
   const {editorSocket} = useEditorSocketStore();
const {activeFileTab,setActiveFileTab} = useActiveFileTabStore();
    const downloadTheme = async()=>{
        const response = await fetch('/dracula.json');
        const data = await response.json();
        setEditorState({...editorState,theme:data});
    }
    useEffect(()=>{
       downloadTheme();
    },[])

      editorSocket?.on("readFileSuccess",(response)=>{
        const data = response.data;
        setActiveFileTab(data.path,data.value,null);
      })

    function handleEditorTheme(editor,monaco){
              
            monaco.editor.defineTheme('dracula',editorState.theme);
            monaco.editor.setTheme('dracula');
        
    }
  return (
    <div>
       {editorState.theme && <Editor 
        height={'80vh'}
        width={'100%'}
        defaultLanguage="javascript"
        defaultValue="// Welcome to playground"
        value={activeFileTab?.value}
        theme="vs-dark"
        options={{
            fontSize:18,
            fontFamily:'monospace'
        }}
        onMount={handleEditorTheme}
        />}
    </div>
  )
}

export default EditorComponent