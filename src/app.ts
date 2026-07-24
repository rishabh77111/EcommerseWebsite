import express from 'express';
const app=express();

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"health route is working",
    });

});
export default app;