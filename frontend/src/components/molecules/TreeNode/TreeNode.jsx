import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Fileicon from '../../atoms/Fileicon/Fileicon';
import useEditorSocketStore from '../../../store/editorSocketStore';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';
import { useFolderContextMenuStore } from '../../../store/FolderContextMenuStore';


const TreeNode = ({fileFolderData}) => {

const [visiblity,setVisiblity]=useState({});
const {editorSocket} = useEditorSocketStore()
const computeExtenstion = (fileFolderData) =>{
   const name = fileFolderData.name.split('.');
   return name[name.length - 1];
}
const {setX:setFileContextX,setY:setFileContextY,setIsOpen:setFileContextIsOpen,setFile:setFileContextFile} = useFileContextMenuStore();
const {setX:setFolderContextX,setY:setFolderContextY,setIsOpen:setFolderContextIsOpen,setFolder:setFolderContextFile} = useFolderContextMenuStore();
const handleDoubleClick = (fileFolderData) =>{
  // Logic to handle file opening can be added here
   editorSocket.emit("readFile",{
     pathToFileOrFolder:fileFolderData.path
    })
}

const handleFileContextMenu = (e,path)=>{
  e.preventDefault();
  setFileContextX(e.clientX);
  setFileContextY(e.clientY);
  setFileContextFile(path)
  setFileContextIsOpen(true);
}
const handleFolderContextMenu = (e,path)=>{
  e.preventDefault();

  setFolderContextX(e.clientX);
  setFolderContextY(e.clientY);
  setFolderContextFile(path)
  setFolderContextIsOpen(true);
}

const toggleVisibility = (name) =>{
    setVisiblity({
      ...visiblity,
      [name]:!visiblity[name]
    })
}
// console.log(fileFolderData.name)

  return (
    <div
    className='pl-5 '
    >
        {fileFolderData.children?
       ( 
         <button
         className='border-none cursor-pointer outline-none bg-transparent text-white pt-2 text-ls flex justify-center items-center'
         onClick={()=>toggleVisibility(fileFolderData.name)}
         onContextMenu={(e)=>handleFolderContextMenu(e,fileFolderData.path)}
         >
        {visiblity[fileFolderData.name]?<IoIosArrowDown/>:<IoIosArrowForward/>}
          {fileFolderData.name.slice(0,15)}
          </button>
        )
        :(
            <button className='flex  items-center gap-2 hover:bg-gray-900 w-full'
            onDoubleClick={()=>handleDoubleClick(fileFolderData)}
            onContextMenu={(e)=>handleFileContextMenu(e,fileFolderData.path)}
            >
              <Fileicon extention={computeExtenstion(fileFolderData)}/>
              <p 
            className='text-ls text-white cursor-pointer '
            >
              {fileFolderData?.name}
              </p>
            
            </button>
        )}

        {visiblity[fileFolderData.name] && fileFolderData.children && (
          fileFolderData.children.map((child)=>(
            <TreeNode
            fileFolderData={child }
            key={child.name}
            />
          ))
        )}
    </div>
  )
}

export default TreeNode