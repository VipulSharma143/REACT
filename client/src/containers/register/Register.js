import React, { useState } from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../navigations/Routes'
import axios from 'axios'

function Register() {

const[form,setForm]=useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword:""

})
const[formError,setFormError]=useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword:""

})

const navigate=useNavigate();

function saveUser(){
  debugger
  try {
    axios.post("http://localhost:8763/register",form).then((d)=>{
      alert(d.data.message);
      navigate(ROUTES.Login.name);
    })
  } catch (error) {
    alert("Fail To Submit Data")
  }
}
function onUserSubmit(){
  let errors=false;
  let error={ 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword:""
}

if(form.firstName.trim().length==0)
{
  errors=true;
  error={...error,firstName:"First Name Empty"}
}
if(form.lastName.trim().length==0)
  {
    errors=true;
    error={...error,lastName:"Last Name Empty"}
  }
  if(form.email.trim().length==0)
    {
      errors=true;
      error={...error,email:"Email Empty"}
    }
    if(form.password.trim().length==0)
      {
        errors=true;
        error={...error,password:"Password Empty or it should contain characters between 6 to 12"}
      }
      if(form.confirmPassword.trim().length==0)
        {
          errors=true;
          error={...error,confirmPassword:"Confirm Password Empty"}
        }
        if(!(form.password.length>=6&&form.password.length<=12))
        {
          errors=true;
          error={...error,password:"Password Empty or it should contain characters between 6 to 12"}
        }
        if(form.password!=form.confirmPassword)
        {
          errors=true;
          error={...error,confirmPassword:"Password And Confirm Password Must Be Same"}
        }
        if(errors)
        {
          setFormError(error)
        }
        else{
          setFormError(error);
          saveUser();
        }
}
const changeHandler=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
}

  return (
    <div>
    <Header />
    <div className='row p-2 m-2'>
      <div className='card text-center mx-auto'>
        <div className='card-header'>
          Register
        </div>
        <div className='card-body'>
            <div className='form-group row'>
              <label className='col-4'>First Name</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='firstName' 
                  className='form-control' 
                  placeholder='First Name' 
                  onChange={changeHandler} 
                />
                <p className='text-danger'>{formError.firstName}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Last Name</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='lastName' 
                  className='form-control' 
                  placeholder='Last Name'
                  onChange={changeHandler} 
                  
                />
                <p className='text-danger'>{formError.lastName}</p>
              </div>
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

                />
            <p className='text-danger'>{formError.password}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Confirm Password</label>
              <div className='col-8'>
                <input 
                  type='password' 
                  name='confirmPassword' 
                  className='form-control' 
                  placeholder='Confirm Password' 
                  onChange={changeHandler} 
                />
               <p className='text-danger'>{formError.confirmPassword}</p>
              </div>
            </div>
        
        </div>
        <div className='card-footer text-muted'>
        <button className='btn btn-primary'onClick={()=>{
          onUserSubmit()
        }}>Register</button>

        </div>
        <button className='btn btn-primary'onClick={(item)=>{
                navigate(
                  ROUTES.Login.name+
                  "?id="+item._id+
                  "&name="+item.name);
                  
              }} >Click Here To Login</button>
        
      </div>
    </div>
  </div>
);
}
export default Register
