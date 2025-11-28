import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Fileicon from '../../atoms/Fileicon/Fileicon';

const TreeNode = ({fileFolderData}) => {

const [visiblity,setVisiblity]=useState({});

const computeExtenstion = (fileFolderData) =>{
   const name = fileFolderData.name.split('.');
   return name[name.length - 1];
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
    className='pl-7'
    >
        {fileFolderData.children?
       ( 
         <button
         className='border-none cursor-pointer outline-none bg-transparent text-white pt-2 text-ls flex justify-center items-center'
         onClick={()=>toggleVisibility(fileFolderData.name)}
         >
        {visiblity[fileFolderData.name]?<IoIosArrowDown/>:<IoIosArrowForward/>}
          {fileFolderData.name}
          </button>
        )
        :(
            <div className='flex  items-center gap-2'>
              <Fileicon extention={computeExtenstion(fileFolderData)}/>
              <p 
            className='text-ls text-white cursor-pointer '
            >
              {fileFolderData?.name}
              </p>
            </div>
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