import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import TreeNode from '../../molecules/TreeNode/TreeNode';

const TreeStructure = () => {
    const {treeStructure,setTreeStructure} =useTreeStructureStore();

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
      <h1 className='text-white'>Tree Structure</h1>
      {treeStructure && <TreeNode fileFolderData={treeStructure}/>}
    </div>
  )
}

export default TreeStructure