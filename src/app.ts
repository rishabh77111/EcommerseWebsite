import express from 'express';


const app=express();

//! inbuilt middleware

app.use(express.json());


//! health route
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"health route is working",
        status:"success",
        success:true,
        data:null,
    });

});

//! path not found route
app.use("/",(req,res)=>{
    const message=`can not ${req.method} on ${req.path}`;
    res.status(404).json({
        message,
        status:"fail",
        success:false,
        data:null,
    });

});

export default app;