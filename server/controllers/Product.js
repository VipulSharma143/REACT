import DepartmentModel from "../models/Department.js";
import ProductModel from "../models/Product.js"

export const CreateProduct=async(req,res)=>{
    try {
        let images = req?.files?.map((item)=>{
            return item.filenamel
          })
        const ProData=ProductModel.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            quantity:req.body.quantity,
            images:images,
            department:req.body.departmentId,

        });
        if(ProData)res.status(201).send({message:"Product Created"});
            else res.status(404).send({message:"Unable To Create Product"});
    } catch (error) {
        console.log("Fail To Submit Data");
    }
}
export const UpdateProduct=async(req,res)=>{
    try {
        let images = req?.files?.map((item)=>{
            return item.filenamel
          })
        const ProData=ProductModel.findByIdAndUpdate(
            {_id:req.body.id,},
            {
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            quantity:req.body.quantity,
            images:images,
            department:req.body.departmentId,

        });
        if(ProData)res.status(200).send({message:"Product Updated"});
            else res.status(404).send({message:"Unable To Update Product"});
    } catch (error) {
        console.log("Fail To Submit Data");
    }
}
export const DeleteProduct=async(req,res)=>{
    try {
        let images = req?.files?.map((item)=>{
            return item.filenamel
          })
        const ProData=ProductModel.deleteOne({
           id:req.body._id,
        });
        if(ProData.deletedCount==1)res.status(200).send({message:"Product Deleted"});
            else res.status(404).send({message:"Unable To Delete Product"});
    } catch (error) {
        console.log("Fail To Submit Data");
    }
}
export const GetProductsByDepartmentId=async(req,res)=>{
    try {
        const ProData=await ProductModel.find({
            department:req.query.departmentId,
        }).populate({path:"department",populate:[{path:"university"}]});
        res.status(200).send({ProData});
    } catch (error) {
     console.log('Fail To Find Data');   
    }
};
export const GetProductDetails=async(req,res)=>{
    try {
        const ProData=await ProductModel.findOne({
            _id:req.query.id,
        }).populate({path:"department",populate:[{path:"university"}]});
        res.status(200).send({ProData});
    } catch (error) {
     console.log('Fail To Find Data');   
    }
};

export const UpdateProductQuantity=async(req,res)=>{
    try {
        let productIndb=await ProductModel.findOne({_id:req.body.id});
        let active=true;
        if(productIndb.quantity-req.body.quantity<=0) active=false;
        let ProData=awaitProductModel.findByIdAndUpdate({_id:req.body.id},
            {
                active:active,
                quantity:productIndb.quantity - req.body.quantity,
            }
        );
        if(ProData)res.status(200).send({message:"Product Quantity Updated"});
        else res.status(404).send({message:"Unable To Update Product Quantity"});
    } catch (error) {
     console.log('Fail To Find Data');   
    }
};


