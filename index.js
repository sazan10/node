const express = require("express");
const data = require("./MOCK_DATA.json");
const fs = require("fs");
const userRouter = require("./routes/user.js");
const app = express();

const {connectMongoDB} = require("./connection.js");
const {logReqRes} = require("./middlewares");
connectMongoDB("mongodb://127.0.0.1:27017/first")
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.log("Monogo error", error));
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));
app.use("/users", userRouter);
app.listen(3000,(req,res)=>console.log("Server started"));