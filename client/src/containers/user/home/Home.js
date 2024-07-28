import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigations/Routes';

function Home() {
  const [universities,setUniversities]=useState();
  
  useEffect(()=>{
    GetAllUniversities();
  },[])
const navigate=useNavigate()

function GetAllUniversities(){
  try {
    axios.get("http://localhost:8763/university").then((d)=>{
      setUniversities(d.data.uniData);
    })
  } catch (error) {
    alert("Fail To Show Data");
  }
}

function RenderUniversities(){
  return universities?.map((item)=>{
    return(   
      <div className='col-3'>
  <div class="card">
      <img class="card-img-top" src={"http://localhost:8763/"+item.image}
       alt="Card image cap"/>

      <div class="card-body">
        <h5 class="card-title">{item.name}</h5>
        <button className='btn btn-primary'onClick={()=>{
            navigate(
              ROUTES.userdepartment.name+
              "?id="+item._id+
              "&name="+item.name);
              
          }} >View Department</button>
      </div>
    </div>
      </div> 
  )
  })
}



  return (
    <div>
      <Header/>
      <div className='row m-2'>
      {RenderUniversities()}
      </div>
  
    </div>
  )
}

export default Home
