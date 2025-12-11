import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";
import useRoomIdStore from "./roomIdStore";
import { usePortStore } from "./portStore";
import { useFileTabStore } from "./fileTabStore";

const useEditorSocketStore = create((set) => {
    return {
        editorSocket: null,
        setEditorSocket: (incomingSocket) => {
            const { setActiveFileTab } = useActiveFileTabStore.getState();
            const { setTreeStructure } = useTreeStructureStore.getState();
            const {setFiles} = useFileTabStore.getState();
            const { getroomId } = useRoomIdStore.getState();
            const {setPort} = usePortStore.getState();
            let roomId = getroomId();
            incomingSocket?.on("readFileSuccess", ({ data }) => {
                console.log("read file sucess emited")
                if (roomId != null){
                    incomingSocket.emit("leave_room",{
                        roomId:roomId
                    })
                }
                const extenstion = data.path.split('.').pop();
                setActiveFileTab(data.path, data.value, extenstion);
                setFiles(data.path);
                roomId=getroomId();
                incomingSocket.emit("join_room", {
                    roomId: roomId
                })
            })
            incomingSocket?.on("writeFileSuccess", ({ data }) => {
                console.log("write file success", data);

                incomingSocket.emit("readFile", {
                    pathToFileOrFolder: data.path
                })
            })
            incomingSocket?.on("deleteFileSuccess", () => {
                setTreeStructure();
            })
            incomingSocket?.on("deleteFolderSuccess", () => {
                setTreeStructure();
            })
            incomingSocket.on("user_joined", (data) => {
                console.log("user joined", data);
            })
            incomingSocket.on("getPortSuccess",(port)=>{
                console.log(port);
                setPort(port);
            })
            set({
                editorSocket: incomingSocket
            });
        },
    };
});

export default useEditorSocketStore;