import useEditorSocketStore from "../../../store/editorSocketStore";
import { useFolderContextMenuStore } from "../../../store/FolderContextMenuStore";

const FolderContextMenu = ({ x, y, path }) => {

    const {editorSocket} = useEditorSocketStore();

    const handleDelete = () =>{
        console.log("delete folder")
editorSocket.emit("deleteFolder",{
    pathToFileOrFolder:path
})
    }

    const {setIsOpen} = useFolderContextMenuStore();
  return (
    <div
    onMouseLeave={()=>setIsOpen(false)}
      className="fixed z-50 w-48 bg-[#363545] backdrop-blur-md shadow-xl 
                 border border-neutral-700 rounded-xl p-2 flex flex-col"
      style={{ top: y, left: x }}
    >
      <button
        className="px-3 py-2 text-left text-gray-200 hover:bg-neutral-800 
                   rounded-lg transition"
        onClick={handleDelete}
      >
        Delete
      </button>

      <button
        className="px-3 py-2 text-left text-gray-200 hover:bg-neutral-800
                   rounded-lg transition"
      >
        Rename                            
      </button>
    </div>
  );
};

export default FolderContextMenu;
