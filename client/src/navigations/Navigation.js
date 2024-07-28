import React from 'react'
import ROUTES from './Routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import {Elements} from '@stripe/react-stripe-js'

function Navigation() {
  return (
    <div>
      <BrowserRouter>
  
      <Routes>
       <Route path={ROUTES.about.name} element={ROUTES.about.component}/>
       <Route path={ROUTES.contact.name} element={ROUTES.contact.component}/>
       <Route path={ROUTES.support.name} element={ROUTES.support.component}/>
       <Route path={ROUTES.Login.name} element={ROUTES.Login.component}/>
       <Route path={ROUTES.register.name} element={ROUTES.register.component}/>
       <Route path={ROUTES.home.name} element={ROUTES.home.component}/>
       <Route path={ROUTES.userdepartment.name} element={ROUTES.userdepartment.component}/>
       <Route path={ROUTES.userproduct.name} element={ROUTES.userproduct.component}/>
       <Route path={ROUTES.productdetails.name} element={ROUTES.productdetails.component}/>
       <Route path={ROUTES.universityAdmin.name} element={ROUTES.universityAdmin.component}/>
       <Route path={ROUTES.departmentAdmin.name} element={ROUTES.departmentAdmin.component}/>
       <Route path={ROUTES.productAdmin.name} element={ROUTES.productAdmin.component}/>
       <Route path={ROUTES.cart.name} element={ROUTES.cart.component}/>
       <Route path={ROUTES.checkout.name} element={ROUTES.checkout.component}/>
       <Route path={ROUTES.ordermanagement.name} element={ROUTES.ordermanagement.component}/>
       <Route path={ROUTES.usermanagement.name} element={ROUTES.usermanagement.component}/>
      <Route path={ROUTES.stripe.name} element={ROUTES.stripe.component}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}


export default Navigation
