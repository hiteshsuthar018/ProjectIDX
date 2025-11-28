import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";

const ProjectPlayground = () => {
  const { projectId:projectIdFromUrl } = useParams();
  const { setProjectId ,projectId} = useTreeStructureStore();
  useEffect(() => {
    setProjectId(projectIdFromUrl)
  }, [projectIdFromUrl, setProjectId])
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