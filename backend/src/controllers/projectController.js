import { createProjectService, getProjectTreeService } from "../service/projectService.js"

export const createProjectController = async(req,res) =>{

    const projectId = await createProjectService();

    return res.status(200).json({message:"project created successfully",data:projectId})
}

export const getProjectTree = async(req,res)=>{
    const {projectId} = req.params;
    const tree = await getProjectTreeService(projectId);
    res.status(200).json({data:tree,success:true,message:"tree fetched successfully"});
}