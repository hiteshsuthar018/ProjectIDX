import { create } from "zustand";

const useEditorSocketStore = create((set) => {
    return {
        editorSocket: null,
        setEditorSocket: (socketInstance) => {
            set({
                editorSocket: socketInstance
            }); 
        },
    };
});

export default useEditorSocketStore;