import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
const MatchedRoutes = () => {
    const [matchedRoutes,setMatchedRoutes]=useState(null);
    const [driverFound, setDriverFound]=useState(false);
    const location=useLocation();
    const formData=(location.state);
    async function searchData(){
        try{
            const response=await axios.post('/routeUserSearch',{formData}).then((res)=>{
                setMatchedRoutes(res.data);
                console.log(res.data);
             })
        }
        catch(err){
            
            setMatchedRoutes('empty');
        }
    }
    useEffect(()=>{
        searchData();
    },[])

  return (
    <>
     {matchedRoutes===null&& <>
        Loading Screen Here
     </>} 

    {matchedRoutes==='empty' &&<>
        driver not found
    </>}


     {matchedRoutes!==null &&  matchedRoutes!=='empty' && <>
        user cards here 
     </>}
    </>
  )
}

export default MatchedRoutes
