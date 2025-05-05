const mongoose=require("mongoose")
const usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    ,
    role:{
        type:String,
        enum:['volunteer','admin'],
        required:true
    }
    ,
    // location:{
    //     lng:String,
    //     lat:true
    // }
    // ,
    active:{
        type:Boolean,
        default: true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }   ,
    updatedAt: {
        type:Date,
        default:Date.now()
    }  
})

module.exports=mongoose.model('User',usersSchema)