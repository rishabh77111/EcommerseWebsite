import express from 'express';
import { errorHandler } from './middlewares/errorHandler.middleware';
import authRoutes from './routes/auth.routes'
import AppError from './utils/customError.util';

const app=express();

//! inbuilt middleware
app.use(express.json());


//! using routes
app.use("/api/auth",authRoutes);


//! health route
app.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"health route is working",
        status:"success",
        success:true,
        data:null,
    });

});

//! path not found route
app.use("/",(req,res,next)=>{
    const message=`can not ${req.method} on ${req.path}`;

    // res.status(404).json({
    //     message,
    //     status:"fail",
    //     success:false,
    //     data:null,
    // });
    // const error:any=new Error(message);
    // error.status='fail';
    // error.statusCode=404;
    next(new AppError(message,404));

});

app.use(errorHandler);

export default app;