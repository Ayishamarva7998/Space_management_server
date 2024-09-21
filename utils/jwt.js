import jwt from "jsonwebtoken"
import dotenv from 'dotenv';


dotenv.config()
const admin_secret = process.env.admin_secret_key;
const staff_secret = process.env.staff_secret_key;

const genarate_admin_token = (admin) => {
    return jwt.sign({ id: admin._id, role: 'admin' }, admin_secret, { expiresIn: '1h' });
  };


  const verifyadmintoken = (token) => {
    
    try {
      return jwt.verify(token,admin_secret);
    } catch (error) {
      return null;
    }
  };


  export{genarate_admin_token,verifyadmintoken}