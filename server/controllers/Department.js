import DepartmentModel from "../models/Department.js"

export const CreateDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.create({
            name:req.body.name,
            image:req?.file?.filename,
            university:req.body.universityId,
        });
        if(depData)res.status(201).send({message:"Department Created"});
        else res.status(404).send({message:"Not Created Department"});
    } catch (error) {
        console.log("Fail to submit data");
    }
};
export const UpdateDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.findByIdAndUpdate({id:req.body.id},
            {
            name:req.body.name,
            image:req?.file?.filename,
            university:req.body.universityId,
        });
        if(depData)res.status(200).send({message:"Department Updated"});
        else res.status(404).send({message:"Not Updated Department"});
    } catch (error) {
        console.log("Fail to submit data");
    }
};
export const DeleteDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.deleteOne({id:req.body.id})
        if(depData.deletedCount==1)res.status(200).send({message:"Department Deleted"});
        else res.status(404).send({message:"Not Deleted Department"});
    } catch (error) {
        console.log("Fail to submit data");
    }
};
export const GetDepartmentsByUniversityId=async(req,res)=>{
    try {
        const depData=await DepartmentModel.find({
            university:req.query.universityId,
        }).populate("university");
        res.status(200).send({depData});
    } catch (error) {
     console.log('Fail To Find Data');   
    }
};
