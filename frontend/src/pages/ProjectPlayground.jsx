import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { io } from "socket.io-client";
import useEditorSocketStore from "../store/editorSocketStore";
const ProjectPlayground = () => {
  const { projectId:projectIdFromUrl } = useParams();
  const { setProjectId ,projectId} = useTreeStructureStore();
   const {setEditorSocket} = useEditorSocketStore();

  useEffect(() => {
    if(projectIdFromUrl){
      setProjectId(projectIdFromUrl)
    const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
      query:{
        projectId:projectIdFromUrl
      }
    });
    setEditorSocket(editorSocketConn);
    }
  }, [projectIdFromUrl, setProjectId,setEditorSocket])



  return (
    <div>
      <div className="flex">

      <div className="h-screen bg-[#262833] min-w-80 bg-">
     {projectId && <TreeStructure />}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex pl-2">
      <EditorButton isActive={false} />
      <EditorButton isActive={true} />
        </div>
        <div className="p-2">
      <EditorComponent />
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProjectPlayground