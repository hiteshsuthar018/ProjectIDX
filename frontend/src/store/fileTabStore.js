import { create } from "zustand";

export const useFileTabStore = create((set, get) => ({
  files: [],

  setFiles: (incomingFile) =>
    set((state) => {
      const alreadyExists = state.files.some(
        (file) => file === incomingFile.path //  unique key
      );

      if (alreadyExists) return state; // no duplicate

      return {
        files: [incomingFile, ...state.files],
      };
    }),

  removeFile: (incomingFile) =>
    set((state) => ({
      files: state.files.filter(
        (file) => file !== incomingFile.path 
      ),
    })),
}));
