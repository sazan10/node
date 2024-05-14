const express = require("express");
const {handleGetAllUsers, handleGetUserById, handleCreateUser, handleGetAllUsersHtml} = require("../controllers/users");

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);

router.get("/html",handleGetAllUsersHtml);

router.route("/:id")
.get(handleGetUserById)
//.patch(async(req, res)=>{})

module.exports = router;