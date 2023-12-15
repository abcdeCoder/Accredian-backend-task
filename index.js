import express from "express";
import parser from "body-parser";
import cors from "cors";
import controllers from "./Controller.js"
import { config } from "dotenv";

config()

// Alllowed origins for the server
const allowedOrigins = [ "http://192.168.1.41:3000", "http://localhost:3000"]


const app = express();
const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
app.use(cors(corsOptions));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));


// routes
app.get("/", (req, res)=>{
    res.send("hello")
})
app.post("/signup",  controllers.signupController);
app.post( "/login", controllers.loginController);

const port =   process.env.PORT || 5050; 

app.listen(port, (err)=>{
    if(!err){
        console.log("Server is running."+process.env.PORT)
    }else{
        console.log("Some Error Occured")
    }
})
