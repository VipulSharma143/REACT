import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';


function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=> new URLSearchParams(search),[search])
}
function UserProduct(){
  const querypa=useQuery();
  const navigate=useNavigate();
  const [products, setProducts]=useState();

  useEffect(()=>{
    GetAll();
  },[]);

function GetAll(){
  try {
    axios.get("http://localhost:8763/product?departmentId="+querypa.get("id")).
    then((d)=>{
      setProducts(d.data.ProData)
  })
  } catch (error) {
    alert("Fail To Fetch Data")
  }
}

function RenderProducts(){
 return products?.map((item)=>{
  return(
<div className='col-3'>
      <div class="card">
          <img class="card-img-top" src={"http://localhost:8763/"+item.images[0]}
           alt="Card image cap"/>
          <div class="card-body">
            <h5 class="card-title">Product Name:{item.name}</h5>
            <h5 class="card-title">Description:{item.description}</h5>
            <h5 class="card-title">Price:{item.price}</h5>
            <h5 class="card-title">Quantity:{item.quantity}</h5>
            <button className='btn btn-primary'onClick={()=>{
                navigate(
                  ROUTES.productdetails.name+
                  "?id="+item._id+
                  "&name="+item.name);
                  
              }} >View Detail</button>
          </div>
        </div>
          </div>
    )
  })
}

  return (
    <div>
      <Header/>
      <div className='row m-2'>{RenderProducts()}</div>
    </div>
  )
}

export default UserProduct
