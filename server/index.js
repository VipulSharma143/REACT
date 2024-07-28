import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from  "cors";
import multer from "multer";
import Stripe from "stripe";
import { CreateUniversity, DeleteUniversity, GetUniversity, UpdateUniversity } from "./controllers/University.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentsByUniversityId, UpdateDepartment } from "./controllers/Department.js";
import { CreateProduct, DeleteProduct, GetProductDetails, GetProductDetailsForUser, GetProductsByDepartmentId, UpdateProduct, UpdateProductQuantity } from "./controllers/Product.js";
import { GetUser, Login, Register } from "./controllers/User.js";
import { CreateOrderHeader, DeleteOrderHeader, GetAllOrderHeaders, GetOrderHeadersByUserId, UpdateOrderHeader } from "./controllers/Orderheader.js";


dotenv.config();

const app = express();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY="sk_test_51NYOktCFScgGj36O6cl71Xqd5FG4M2XoHDaFX1OMRaEtHkKjAUM12V5alZdXj3oUQ98oTlwsbzTjS1Y4exRE7yxH00MEfLGOJB");

app.use(express.json());
app.use(cors());
//University Module
const storeUni=multer.diskStorage({
    destination:"Upload",
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const  uploadUni=multer({
    storage:storeUni 
});
app.post("/university",uploadUni.single("image"),CreateUniversity);
app.put("/university",uploadUni.single("image"),UpdateUniversity);
app.delete("/university",DeleteUniversity);
app.get("/university",GetUniversity);
////Department

const storedep=multer.diskStorage({
    destination:"UploadDep",
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const  uploaddep=multer({
    storage:storedep 
});
app.post("/department",uploaddep.single("image"),CreateDepartment);
app.put("/department",uploaddep.single("image"),UpdateDepartment);
app.delete("/department",DeleteDepartment);
app.get("/department",GetDepartmentsByUniversityId);

///Products
const storepro=multer.diskStorage({
    destination:"UploadPro",
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const  uploadpro=multer({
    storage:storepro, 
});

app.post("/product",uploadpro.array("images"),CreateProduct);
app.put("/product",uploadpro.array("images"),UpdateProduct);
app.delete("/product",DeleteProduct);
app.get("/product",GetProductsByDepartmentId);
app.get("/productDetails",GetProductDetails);
app.put("/updateproductquantity",UpdateProductQuantity);

//User Module
app.post("/register",Register);
app.post("/login",Login)
//Images Access
app.use(express.static("upload/"));
app.use(express.static("uploadDep/"));
app.use(express.static("uploadPro/"));

//Get User For Details
app.get("/getUser",GetUser);
app.get("/getproductuser",GetProductDetailsForUser)
//Order Header

app.post('/order', CreateOrderHeader);
app.put('/order', UpdateOrderHeader);
app.delete('/order', DeleteOrderHeader);
app.get('/order', GetOrderHeadersByUserId);
app.get('/allorders',GetAllOrderHeaders)


//stripe

app.post('/create-checkout-session', async (req, res) => {
    try {
      const { products } = req.body;
  
      const lineItems = products.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.images[0]],
          },
          unit_amount: product.price * 100, 
        },
        quantity: product.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/allorders`,
        cancel_url: `http://localhost:3000/productDetails`,
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating checkout session", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Stripe Webhook 
  app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
    }
  
    res.json({ received: true });
  });




mongoose.connect(process.env.DB_URL).then(()=>{ 
    console.log("Connected");
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port:" + process.env.PORT);
    });
}).catch(()=>{
    console.log("Not Connected")
});











