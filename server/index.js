import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from  "cors";
import multer from "multer";
import { CreateUniversity, DeleteUniversity, GetUniversity, UpdateUniversity } from "./controllers/University.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentsByUniversityId, UpdateDepartment } from "./controllers/Department.js";
import { CreateProduct, DeleteProduct, GetProductsByDepartmentId, UpdateProduct } from "./controllers/Product.js";

dotenv.config();

const app = express();

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

mongoose.connect(process.env.DB_URL).then(()=>{ 
    console.log("Connected");
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port:" + process.env.PORT);
    });
}).catch(()=>{
    console.log("Not Connected")
});
///Product
const storepro=multer.diskStorage({
    destination:"UploadPro",
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const  uploadpro=multer({
    storage:storepro, 
});
//mohit
app.post("/product",uploadpro.single("image"),CreateProduct);
app.put("/product",uploadpro.single("image"),UpdateProduct);
app.delete("/product",DeleteProduct);
app.get("/product",GetProductsByDepartmentId);

mongoose.connect(process.env.DB_URL).then(()=>{ 
    console.log("Connected");
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port:" + process.env.PORT);
    });
}).catch(()=>{
    console.log("Not Connected")
});











