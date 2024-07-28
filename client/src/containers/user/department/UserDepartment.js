import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

function useQuery(){
  const {search}=useLocation();
  return React.useMemo(()=> new URLSearchParams(search),[search])
}

function UserDepartment(){
  const querypa=useQuery();
  const navigate=useNavigate();
  const [departments,setDepartments]=useState([]);
  
  useEffect(()=>{
    GetAll();
  },[]);

function GetAll(){
  try {
    axios.get("http://localhost:8763/department?universityId="+querypa.get("id")).
    then((d)=>{
      setDepartments(d.data.depData)
    })
  } catch (error) {
    alert("Fail To Fetch Data")
  }
}

function renderDepartments(){
  return departments?.map((item)=>{
    return(
      <div className='col-3'>
      <div class="card">
          <img class="card-img-top" src={"http://localhost:8763/"+item.image}
           alt="Card image cap"/>
          <div class="card-body">
            <h5 class="card-title">{item.name}</h5>
            <button className='btn btn-primary'onClick={()=>{
                navigate(
                  ROUTES.userproduct.name+
                  "?id="+item._id+
                  "&name="+item.name);
                  
              }} >View Products</button>
          </div>
        </div>
          </div>
    )
  })
}

  return (
    <div>
      <Header/>
      <div className='row m-2'>{renderDepartments()}</div>
    </div>
  )
}



export default UserDepartment
