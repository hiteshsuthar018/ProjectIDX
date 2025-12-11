import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import TreeNode from '../../molecules/TreeNode/TreeNode';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';
import FileContextMenu from '../../molecules/ContextMenuComponent/FileContextMenu';
import { useFolderContextMenuStore } from '../../../store/FolderContextMenuStore';
import FolderContextMenu from '../../molecules/ContextMenuComponent/FolderContextMenu';

const TreeStructure = () => {
    const {treeStructure,setTreeStructure,} =useTreeStructureStore();
    const {isOpen:isFileContextMenuOpen,x:FileContextMenuX,y:FileContextMenuY,file:FileContextMenuPath} = useFileContextMenuStore();
    const {isOpen:isFolderContextMenuOpen,x:FolderContextMenuX,y:FolderContextMenuY,folder:FolderContextMenuPath} = useFolderContextMenuStore();
    useEffect(() => {
      if(treeStructure){
        console.log(treeStructure)
      }
      else{
        setTreeStructure();
      }
    }
,[setTreeStructure,treeStructure]);
  return (
    <div>
      {isFileContextMenuOpen && FileContextMenuX && FileContextMenuY && <FileContextMenu
      x={FileContextMenuX}
      y={FileContextMenuY}
      path={FileContextMenuPath}
      />}

      {isFolderContextMenuOpen && FolderContextMenuX && FolderContextMenuY && <FolderContextMenu
      x={FolderContextMenuX}
      y={FolderContextMenuY}
      path={FolderContextMenuPath}
      />}
      <h1 className='text-white'>Tree Structure</h1>
      {treeStructure && <TreeNode fileFolderData={treeStructure}/>}
    </div>
  )
}

export default TreeStructure