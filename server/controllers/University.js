import UniversityModel from "../models/University.js"

export const CreateUniversity=async(req,res)=>{
    try {
      const uniData=await UniversityModel.create({
        name:req.body.name,
        image:req?.file?.filename,
    });
    if(uniData)res.status(201).send({message:"University Created"});
        else res.status(404).send({message:"Error In Creating University"});
    } catch (error) {
     console.log('Fail To Submit Data');   
    }
};
export const UpdateUniversity=async(req,res)=>{
    try {
      const uniData=await UniversityModel.findByIdAndUpdate({id:req.body.id},{
        name:req.body.name,
        image:req?.file?.filename,
    });
    if(uniData)res.status(200).send({message:"University Updated"});
        else res.status(404).send({message:"Error In Updating University"});
    } catch (error) {
     console.log('Fail To Submit Data');   
    }
};
export const DeleteUniversity=async(req,res)=>{
    try {
      const uniData=await UniversityModel.deleteOne({_id:req.body.id});
    if(uniData.deletedCount==1)res.status(200).send({message:"University Deleted"});
        else res.status(404).send({message:"Error In Deleting University"});
    } catch (error) {
     console.log('Fail To Submit Data');   
    }
};
export const GetUniversity=async(req,res)=>{
    try {
      const uniData=await UniversityModel.find();
      res.status(200).send({uniData});
    } catch (error) {
     console.log('Fail To Find Data');   
    }
};