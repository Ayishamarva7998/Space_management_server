import mongoose from "mongoose";


const staffSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        },
        dateofbirth:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phonenumber:{
            type:Number,
            required:true
        },
        education:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        badgecolor:{
            type:String,
            required:true
        },
        batch:[{
          type:String,
          required:true
        }],
        password: {
            type: String,
            
        },
        profileImg:{
           type:String
        },  
         is_delete: {
            type: Boolean,
            default: false,
          },
          is_active:{
            type:Boolean,
            default:true
          }
    },

    {
        timestamps: true,
      }
)

const Staff  = mongoose.model("Staff",staffSchema)

export {Staff}