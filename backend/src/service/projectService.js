import uuid4 from 'uuid4';
import { execPromisified } from '../utils/execUtility.js';
import fs from "fs/promises";
import { REACT_PROJECT_COMMAND } from '../config/envConfig.js';
import directoryTree from 'directory-tree';
import path from 'path';
export const createProjectService = async () => {
   // create and unique and create new folder inside project folder  with that id
       const projectId = uuid4();
       console.log("new project id :",projectId);
       await fs.mkdir(`./projects/${projectId}`);
       
       //after that call the npm create vite@latest inside that new folder
       const response = await execPromisified(REACT_PROJECT_COMMAND,{
           cwd:`./projects/${projectId}`
       })
   
        return projectId;
}

export const getProjectTreeService = async(projectId) =>{
     const projectPath = path.resolve(`./projects/${projectId}`);
     const tree = await directoryTree(projectPath);
     return tree;

}