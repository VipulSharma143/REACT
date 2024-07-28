import UserModel from "../models/User.js";

export const Register=async(req,res)=>
{
    try {
        let user=await UserModel.findOne({
          email:req.body.email
        });
        if(user){
            res.status(404).send({message:"User Already Created With This Email"});
            return;
        }
        let userInfo=await UserModel.create({
            ...req.body,
            profilePic:req?.file?.filename,

        });
        if(userInfo)res.status(201).send({message:"User Created Successfully"});
        else res.status(404).send({message:"User Not Created"});
    } catch (e) {
        res.status(404).send({error:e?.message});
    }
}
export const Login=async (req,res)=>{
    try {
       let user=await UserModel.findOne({
        email:req.body.email,
        password:req.body.password,
       });
       if(user)res.status(200).send({id:user.id,role:user.role});
       else res.status(404).send({message:"Wrong Username Or Password"});
    } catch (e) {
      res.status(404).send({error:e?.message});  
    }
    
};
export const GetUser = async (req, res) => {
    try {
        const userId = req.query.id; 
        const user = await UserModel.findById(userId); 
        if (user) {
            res.status(200).send({ user });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    } catch (error) {
        console.log('Fail To Find User');
        res.status(500).send({ message: 'Fail To Find User', error });
    }
};
