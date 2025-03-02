import React, { useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AAContext from '../context/AAContext';

const Index = () => {
  const context = useContext(AAContext);
  const { getUserData, userData } = context;
    const navigate = useNavigate();
    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate("/login");
      }else{
          getUserData()
        }
    }, []);
    if(userData.occupation == 'farmer'){
      navigate('/farmerhome')
    }else if(userData.occupation == 'worker'){
      navigate('/workerhome')
    }else{
      navigate('/sellerhome')
    }
  return (
    <div></div>
  )
}

export default Index