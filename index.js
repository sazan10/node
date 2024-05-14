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
})
const User = mongoose.model("user", userSchema);


app.use(express.urlencoded({extended:false}));
app.get("/api/users",(req,res)=>{
    res.json(data);
})
app.get("/users",(req,res)=>{
    res.send(`<ul>
        ${data.map(i=>`<li>${i.first_name}</li>`).join("")}
    </ul>`);
})
app.post("/api/register",(req,res)=>{
    console.log('req body', req.body)
    data.push({id:data.length+1,...req.body});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(data),(err,data)=>{
        return res.json({status:"success"});
    });
})
app.get("/api/users/:id",(req,res)=>{
    const userId= Number(req.params.id);
    const user = data.find(d=>d.id==userId);
    res.json(user);
})
app.listen(3000,(req,res)=>console.log("Server started"));