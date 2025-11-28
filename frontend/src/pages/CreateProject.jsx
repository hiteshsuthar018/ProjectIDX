import { Spin } from 'antd';
import { useCreateProject } from '../hooks/apis/mutations/useCreateProject'
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
   const {createProjectMutation,isPending } = useCreateProject();
   const navigate = useNavigate();
    async function handleCreateProject (){
        console.log("going to trigger api")
        try {
           const response =  await createProjectMutation();
           navigate(`/project/${response.data}`);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-white">

  {/* Header */}
  <header className="w-full h-[8vh] bg-gray-800 flex items-center justify-center text-xl font-semibold shadow-md">
    IDX
  </header>

  {/* Main */}
  <main className="flex-1 flex items-center justify-center">
    <button
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-medium rounded-xl shadow-lg"
      onClick={handleCreateProject}
    >
     { isPending?<Spin indicator={<LoadingOutlined spin />}/>:"Create Playground" }
    </button>
   
  </main>

  {/* Footer */}
  <footer className="w-full h-[6vh] bg-gray-800 flex items-center justify-center text-sm text-gray-400">
    @hitesh
  </footer>

</div>

  )
}

export default CreateProject