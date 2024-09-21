import { Admin } from "../models/admin.js";
import { genarate_admin_token } from "../utils/jwt.js";

export const login = async (req,res)=>{
    const {email,password}=req.body;
    
    try {

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        };

        const admin = await Admin.findOne({email}); 
        
        
        if(!admin){
          return res.status(404).json({message:"Not found the Admin"});
        };

        return res.status(201).json({message:"logged successfully",token:genarate_admin_token(admin)})
      
      
    } catch (error) {
        return res.status(404).json({message:error})
        console.log(error);
        
    }
}