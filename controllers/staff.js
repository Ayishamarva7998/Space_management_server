import { Staff } from "../models/staff.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import transport from "../config/nodemailer.js";
import { logintemplate } from "../templates/logininvitation.js";
import cloudinary from "cloudinary";

dotenv.config();

export const createStaff = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      dateofbirth,
      email,
      phonenumber,
      education,
      address,
      role,
      badgecolor,
      batch,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !dateofbirth ||
      !email ||
      !phonenumber ||
      !education ||
      !address ||
      !role ||
      !badgecolor ||
      !batch
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({ message: "You're already registered" });
    }

    const genarate_password = () => {
      const length = 10;
      const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@?";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    };
    const password = genarate_password();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newStaff = new Staff({
      firstname,
      lastname,
      dateofbirth,
      email,
      phonenumber,
      education,
      address,
      role,
      badgecolor,
      batch,
      password: hashedPassword,
      profileImg: req.cloudinaryImageUrl,
    });

    await newStaff.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to the team!",
      html: logintemplate(
        firstname,
        lastname,
        role,
        email,
        password,
        badgecolor
      ),
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending mail:", error);
        return res.status(500).json({ message: "Error sending mail", error });
      }
    });

    res.status(201).json({ message: "Staff created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding new staff", error: error.message });
  }
};




export const updatestaff = async (req, res) => {
  try {
    const staffId = req.params.id;
 
    
    const staff1 = await Staff.findById(staffId);
  
    const {
      firstname,
      lastname,
      email,
      role,
      badgecolor,
      batch,
    } = req.body;



    const existingStaff = await Staff.findOne({
      _id: staffId,
      is_delete: false,
    });
    if (!existingStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    let profileImgUrl = existingStaff.profileImg;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(req.file.buffer);
      });
      profileImgUrl = result.secure_url;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      staffId,
      {
        firstname,
        lastname,
        email,
        role,
        badgecolor,
        batch,
        profileImg: profileImgUrl,
      },
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res
      .status(200)
      .json({ message: "Staff updated successfully", staff: updatedStaff });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error updating staff", error: error.message });
  }
};







export const getallstaff = async (req, res) => {
  const staff = await Staff.find({is_delete:false});

  if (staff.length > 0) {
    return res.status(200).json({ message: staff });
  } else {
    res.status(200).json({  message
      : [] });
  }
};



export const staff = async (req, res) => {
  const staffid = req.params.id;

  const staffone = await Staff.findById(staffid);

  if (!staffone) {
    return res.status(404).json({ message: "Staff not found" });
  } else {
    return res
      .status(200)
      .json({ message: "Staff data fetched succussfully", staffone });
  }
};


export const delete_staff =  async(req,res)=>{

  const id = req.params.id
  const deletedstaff =  await Staff.findById(id)
  if(!deletedstaff){
    return res.status(404).json({message:"Staff not found"})
  }

  deletedstaff.is_delete = true
  await deletedstaff.save()
  return res.status(200).json({ message:"staff deleted sucessfully", deletedstaff})
}



