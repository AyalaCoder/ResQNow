const User=require("../models/User")
const getAllUsers=async(req,res)=>{
const users=await User.find().lean()
if(!users.length){
   return res.status(404).massage("there is no users")}
    res.json(users)
}
const createNewUser=async(req,res)=>{
const {name,phone,email,password,role}=req.body
if(!name||!email||!phone||!password||!role||role!="volunteer"){
    return res.status(404).massage("there is required details missing")}
const newUser=await User.create(name,phone,email,password,role)
res.json(newUser)
}
const getUser=async(req,res)=>{
const {userid}=req.params
const user=await User.findById(userid)
if(!user){
    return res.status(404).massage("you are not log in")}
res.json(user)  
}
const updateUser=async(req,res)=>{
    const {userid}=req.params
    const {name,phone,email,password,role}=req.body
    if(!name||!email||!phone||!password||!role){
        return res.status(404).massage("there is required details missing")}
    const user=await User.findById(userid)
    if(!user){
        return res.status(404).massage("you are not log in")}
    user.name=name
    user.email=email
    user.phone=phone
    user.password=password
    user.role=role
    const updateduser=user.save()
    res.json(updateduser)  
}
const deleteUser=async(req,res)=>{
const {userid}=req.params
const user=await User.findById(userid)
if(!user)
    return res.status(404).massage("you are not log in")

const reply=`User '${user.name}' ID ${user.id} deleted`
    const result = await user.deleteOne()
    res.json(reply)
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUser,
    updateUser,
    deleteUser
    }