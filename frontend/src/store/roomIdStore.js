import {create} from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";



const useRoomIdStore = create((set)=>({
    getroomId:()=>{
         const {activeFileTab} = useActiveFileTabStore.getState();
         const {projectId} = useTreeStructureStore.getState();
         if(projectId==null || activeFileTab==null){
            return null;
         }
         return activeFileTab?.path+projectId;
    }
}))

export default useRoomIdStore;