const express = require("express");
const data = require("./MOCK_DATA.json");

const app = express();
app.get("/api/users",(req,res)=>{
    res.json(data);
})
app.get("/users",(req,res)=>{
    res.send(`<ul>
        ${data.map(i=>`<li>${i.first_name}</li>`).join("")}
    </ul>`)
})

app.get("/api/users/:id",(req,res)=>{
    const userId= Number(req.params.id);
    const user = data.find(d=>d.id==userId);
    res.json(user);
})
app.listen(3000,(req,res)=>console.log("Server started"));