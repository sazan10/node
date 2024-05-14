const express = require("express");
const data = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/first")
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.log("Monogo error", error));
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    gender:{
        type:String
    }
},{timestamps: true})
const User = mongoose.model("user", userSchema);


app.use(express.urlencoded({extended:false}));
app.get("/api/users",async (req,res)=>{
    const allUsers = await User.find({});
    res.json(allUsers);
})
app.get("/users",async (req,res)=>{
    const allUsers = await User.find({});
    res.send(`<ul>
        ${allUsers.map(i=>`<li>${i.firstName}: - ${i.email}</li>`).join("")}
    </ul>`);
})
app.post("/api/register",async (req,res)=>{
    console.log('req body', req.body)
    data.push({id:data.length+1,...req.body});
    const body = req.body;
    if(!body || !body.first_name|| !body.last_name || !body.email || !body.gender){
        res.status(400).json({msg:"All fields are required"});
    }
    const result = await User.create({
        firstName:body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
    })
    return res.status(201).json({status:"success"});
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(data),(err,data)=>{
    //     return res.json({status:"success"});
    // });
})
app.get("/api/users/:id",async (req,res)=>{
    const userId= Number(req.params.id);
    // const user = data.find(d=>d.id==userId);
    try{
        //patch: findByIdAndUpdate(req.params.id, {lastName:"odnfs"})
        //delete: findByIdAndDelete(req.params.id)
        const user = await User.findById(req.params.id);
    res.json(user);

    }
    catch{

        res.json({ms:'not found'});
    }
})
app.listen(3000,(req,res)=>console.log("Server started"));