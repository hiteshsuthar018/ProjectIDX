import { useQuery } from "@tanstack/react-query";
import { getProjectTree } from "../../../apis/projects";



export default function useProjectTree(projectId){
    const {data:projectTree,isLoading,error,isError} = useQuery({
        queryFn:()=>getProjectTree({projectId}),
        // queryKey:['tree'],
        // staleTime:10000
    })
   return {
    projectTree,
    isLoading,
    error,
    isError
   }
}