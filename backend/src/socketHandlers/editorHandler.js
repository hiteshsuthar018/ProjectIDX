import fs from 'fs/promises';
export const handleEditorSocketEvents = (socket) =>{
    // writing in exisiting file
    socket.on("writeFile" , async({data,pathToFileOrFolder})=>{
            try {
                await fs.writeFile(pathToFileOrFolder,data);
                socket.emit("write File Success",{
                    data:"file written successfully"
                })
            } catch (error) {
                console.log("erro while writing file",error)
                socket.emit("error",{
                    data:"Error wiriting the file"
                })
            }
    })
    // creating new file
    socket.on("createFile",async({pathToFile})=>{
        const isFileAlreadyExist = await fs.stat(pathToFile);
        if(isFileAlreadyExist){
            socket.emit("error",{
                data:"File already Exist"
            })
        }
        try {
            await fs.writeFile(pathToFile,data,"");
            socket.emit("createFileSuccess",{
                data:"File created successfully"
            })
        } catch (error) {
            console.log("error while creating file");
            socket.emit("error",{
                data:"error creating file"
            })
        }
    })
    //reading file
    socket.on("readFile",async({pathToFileOrFolder})=>{
        try {
            const response = await fs.readFile(pathToFileOrFolder);
            console.log(response.toString())
            socket.emit("readFileSuccess",{
                data:{
                    value:response.toString(),
                    path:pathToFileOrFolder
                }
            })
        } catch (error) {
            console.log("error in reading the file",error);
            socket.emit("error",{
                data:"Error while reading file"
            })
        }
    })
    // deleting file
    socket.on("deleteFile",async({pathToFileOrFolder})=>{
        try {
            await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess",{
                data:"file deleted successfully"
            })
        } catch (error) {
            console.log("file deleting error",error);
            socket.emit("error",{
                data:"error while deleting file"
            })
        }
    })
    //creating folder
     socket.on("createFolder",async({pathToFileOrFolder})=>{
        try {
            await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess",{
                data:"folder created successfully"
            })
        } catch (error) {
            console.log("folder creating error",error);
            socket.emit("error",{
                data:"error while creating folder"
            })
        }
     })
    //deleting folder
     socket.on("deleteFolder",async({pathToFileOrFolder})=>{
        try {
            await fs.rmdir(pathToFileOrFolder , {recursive:true});
            socket.emit("deleteFolderSuccess",{
                data:"folder deleted successfully"
            })
        } catch (error) {
            console.log("folder deleting error",error);
            socket.emit("error",{
                data:"error while deleting folder"
            })
        }
     })
}