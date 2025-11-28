import { useQuery } from "@tanstack/react-query";
import { pingApi } from "../../../apis/ping";

//stale time and cashtime
export default function usePing(){
     const {isLoading,isError,data,error} = useQuery({
        queryFn:pingApi,
        queryKey:['ping'], // key of the cashing value
        staleTime:10000
        //  cacheTime: 10000
     });

     return {
        isLoading,
        isError,
        data,
        error
     }
}