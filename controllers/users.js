const {User} = require("../models/user");
async function handleGetAllUsers(req,res){
    const allUsers = await User.find({});
    res.json(allUsers);
}

async function handleGetUserById(req,res){
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
}

async function handleCreateUser(req,res){
    console.log('req body', req.body)
    // data.push({id:data.length+1,...req.body});
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
}
async function handleGetAllUsersHtml(req,res){
    const allUsers = await User.find({});
    res.send(`<ul>
        ${allUsers.map(i=>`<li>${i.firstName}: - ${i.email}</li>`).join("")}
    </ul>`);
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleGetAllUsersHtml
}