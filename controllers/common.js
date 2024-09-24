"use strict"
import { Admin } from "../models/admin.js";
import { Staff } from "../models/staff.js";



export const getdatafromid = async(req,res)=>{

    const {id} = req.params;
  
    const admin = await Admin.findById(id);
    if (admin) {
        return res.status(200).json({ ...admin.toObject(), role: 'admin' });
    }
  
    const staff = await Staff.findById(id);
    if (staff) {
        return res.status(200).json({ ...staff.toObject() });
    }
  
    return res.status(404).json({ message: "Not found" });
  }