import express from "express"
import mongoose from "mongoose"
import Dotenv from "dotenv"
import cors from "cors"
import multer from "multer"; // Import multer
import adminroute from "./routes/admin_route.js"
import loginroute from "./routes/auth.js"
import staffroute from './routes/staff_route.js'




Dotenv.config()
const server = express()
const upload = multer();
server.use(express.json())
// server.use(express.urlencoded({ extended: true }))
// server.use(bodyParser.json({ type: 'application/*+json' }))
server.use(express.urlencoded({ extended: true })); // For URL-encoded payloads


server.use(cors())




server.use("/api/admin", adminroute);
server.use("/api", loginroute);
server.use("/api", staffroute);



// Local Host
const PORT = process.env.PORT 
server.listen(PORT,()=>{
    console.log(`Server Running in Port ${PORT}`)
})


// Connecting DB
mongoose.connect(process.env.DB,{dbName:"space-management"})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));





// Dotenv.config();
// const server = express();

// // Setup multer
// const upload = multer(); // No file destination needed if only handling form-data

// server.use(express.json()); // For JSON payloads
// server.use(express.urlencoded({ extended: true })); // For URL-encoded payloads
// server.use(cors());

// // Use multer middleware for handling form-data
// // server.use(upload.none()); // Parse form-data but ignore files

// server.use("/api/admin", adminroute);
// server.use("/api", loginroute);
// server.use("/api", staffroute);

// // Local Host
// const PORT = process.env.PORT;
// server.listen(PORT, () => {
//   console.log(`Server Running on Port ${PORT}`);
// })

// // Connecting DB
// mongoose.connect(process.env.DB,{dbName:"space-management"})
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

