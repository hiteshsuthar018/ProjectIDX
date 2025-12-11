import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import useEditorSocketStore from "../../../store/editorSocketStore";
import { extenstionMapToLanguage } from "../../../utils/extentionToLanguageMap";
import useRoomIdStore from "../../../store/roomIdStore";
const EditorComponent = ({showBrowser}) => {
    const [editorState , setEditorState] = useState({theme:null});
const {activeFileTab,setActiveFileTab} = useActiveFileTabStore();
const {getroomId} = useRoomIdStore();

    const downloadTheme = async()=>{
        const response = await fetch('/dracula.json');
        const data = await response.json();
        setEditorState({...editorState,theme:data});
    }
    useEffect(()=>{
       downloadTheme();
    },[])

  

  const {editorSocket} = useEditorSocketStore();
  let timerId=null;
    function handleChange(editorContent){
       if(timerId!=null){
        clearTimeout(timerId);
       }
       timerId = setTimeout(()=>{
        const roomId = getroomId();
        editorSocket.emit("writeFile",{
          data:editorContent,
          pathToFileOrFolder:activeFileTab.path,
          roomId:roomId
        })
        console.log("write file emit")
       },2000)
    }
     
    function handleEditorTheme(editor,monaco){
            monaco.editor.defineTheme('dracula',editorState.theme);
            monaco.editor.setTheme('dracula');
    } 
  return (
    <div>
       {editorState.theme && <Editor
       height={"100vh"}
        defaultLanguage="undefined"
        language={extenstionMapToLanguage(activeFileTab?.extention)}
        defaultValue="//Welcome to playground"
        value={activeFileTab?.value}
        theme="vs-dark"
        options={{
            fontSize:18,
            fontFamily:'monospace'
        }}
        onChange={handleChange}
        onMount={handleEditorTheme}
        />}
    </div>
  )
}

export default EditorComponent