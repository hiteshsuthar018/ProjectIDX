import usePing from '../../hooks/apis/queries/usePing';

const Ping = () => {
   const {isLoading,data} = usePing();
       
      if(isLoading){
          return <div>Loading...</div>
      }
      
    return (
      <>
        hello {data?.message}
       {}
      </>
    )
}

export default Ping