import About from "../containers/about/About";
import Department from "../containers/admin/department/Department";
import Product from "../containers/admin/product/Product";
import University from "../containers/admin/university/University";
import Contact from "../containers/contact/Contact";
import Login from "../containers/login/Login";
import OrderManagement from "../containers/Management/OrderManagement";
import UserManagement from "../containers/Management/UserManagement";
import Register from "../containers/register/Register";
import Support from "../containers/support/Support";
import OrderHeaderManager from "../containers/user/checkout/checkout";
import Checkout from "../containers/user/checkout/checkout";
import UserDepartment from "../containers/user/department/UserDepartment";
import Home from "../containers/user/home/Home";
import UserProduct from "../containers/user/product/UserProduct";
import ProductDetail from "../containers/user/productDetail/ProductDetail";
import Cart from "../containers/user/Shopping/Cart";
import Stripe from "./Stripe";

const ROUTES= {
 about:{
    name:"/about",
    component:<About/>
 },
 contact:{
    name:"/contact",
    component:<Contact/>
 },
 Login:{
    name:"/login",
    component:<Login/>
 },
 register:{
    name:"/register",
    component:<Register/>
 },
 support:{
    name:"/support",
    component:<Support/>
 },
 departmentAdmin:{
    name:"/departmentAdmin",
    component:<Department/>
 },
 productAdmin:{
    name:"/productAdmin",
    component:<Product/>
 },
 universityAdmin:{
    name:"/universityAdmin",
    component:<University/>
 },
 userdepartment:{
    name:"/userdepartment",
    component:<UserDepartment/>
 },
 home:{
    name:"/",
    component:<Home/>
 },
 userproduct:{
    name:"/userproduct",
    component:<UserProduct/>
 },
 productdetails:{
    name:"/productdetails",
    component:<ProductDetail/>
 },
 cart:{
   name:"/shoppingcart",
   component:<Cart/>
 },
checkout:{
   name:"/checkout",
   component:<Checkout/>
},
ordermanagement:{
   name:"/ordermanage",
   component:<OrderManagement/>
},
usermanagement:{
   name:"/usermanage",
   component:<UserManagement/>
},
stripe:{
   name:"/stripe",
   component:<Stripe/>
}
};
export default ROUTES;