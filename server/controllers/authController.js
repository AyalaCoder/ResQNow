const User = require("../models/User")
 2
const login = async (req,res)=>{
    const { name, password } = req.body
    if (!username || !password) {
    return res.status(400).json({message:'All fields are required'})
    const found = await User.findOne({username}).lean()
    if (!found || !found.active) {
        return res.status(401).json({ message: 'you are not register' })
    }
    const match = await bcrypt.compare(password, found.password)
    if(!match)
        return res.status(401).json({message:'the password is not correct' })
    res.send(" hello")
    }
 }
 const register = async (req,res)=>{
    const {name, phone, password, email, role} = req.body
    if(!name||!phone||! password||! email||! role)
        return res.status(400).json({message:'All fields are required'})
    const logdin = await User.findOne({username:username}).lean()
    if(logdin){
    return res.status(409).json({message:"Duplicate username"})
    }
    const hashed = await bcrypt.hash(password, 10)
    const userObject= {name,phone,username,email,role,password:hashed}
    const user = await User.create(userObject)
    if (user) { 
    return res.status(201).json({message:`New user ${user.username}
    created` })
    } else {
    return res.status(400).json({message:'Invalid user received'})
    }
 }
 module.exports = {login, register}