import React, { useState } from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../navigations/Routes'
import axios from 'axios'

function Login() {

  const[form,setForm]=useState({
      email: '',
      password: ''
  })
  const[formError,setFormError]=useState({
      email: '',
      password: ''
  })
  const changeHandler=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
const navigate=useNavigate()

function CheckUser(){
  try {
    axios.post("http://localhost:8763/login",form).then((d)=>{
      localStorage.setItem("id",d.data.id)
      localStorage.setItem("role",d.data.role)
      if(d.data.role=="admin")navigate(ROUTES.universityAdmin.name)
      if(d.data.role=="user")navigate(ROUTES.home.name)
    }).catch((e)=>{
  alert("Wrong USer Or Password")})
  setForm({email:"",password:""});
  } catch (error) {
    alert("Fail To Submit Data")
  }
}
function OnLoginRequest(){
  let errors=false
  let error={email:"",password:""}
  if(form.email.trim().length==0)
  {
    errors=true;
    error={...error,email:"Username Empty"}
  }
  if(form.password.trim().length==0){
    errors=true;
    error={...form,password:"Password Empty"}
  }
  if(errors)
  {
    setFormError(error)
  }
  else{
    setFormError(error)
    CheckUser();
  }
}


return (
  <div>
  <Header />
  <div className='row p-2 m-2'>
    <div className='card text-center mx-auto'>
      <div className='card-header'>
        Login With Your Email Address And Password
      </div>

          <div className='form-group row'>
            <label className='col-4'>Email</label>
            <div className='col-8'>
              <input 
                type='email' 
                name='email' 
                className='form-control' 
                placeholder='Email' 
                onChange={changeHandler}
                value={form.email}
              />
                <p className='text-danger'>{formError.email}</p>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-4'>Password</label>
            <div className='col-8'>
              <input 
                type='password' 
                name='password' 
                className='form-control' 
                placeholder='Password' 
                onChange={changeHandler}
                value={form.password}
              />
                <p className='text-danger'>{formError.password}</p>
            </div>
          </div>
          <div className='card-footer text-muted'>
      <button onClick={()=>{
        OnLoginRequest();
      }} className='btn btn-primary'>Login</button>
      </div>
      <div className='card-footer text-muted'>
      <button className='btn btn-primary'onClick={(item)=>{
                navigate(
                  ROUTES.register.name+
                  "?id="+item._id+
                  "&name="+item.name);
                  
              }} >Click Here To Register</button>
        </div>
      </div>

    </div>
  </div>
)
}

export default Login
