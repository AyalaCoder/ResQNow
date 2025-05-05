const mongoose=require("mongoose")
const notificationSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },   
    message: String,            
    emergencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Emergency' },
    isRead: { type: Boolean, default: false },  
    createdAt: Date
  }
  
  
  )

module.exports=mongoose.model('Notification',notificationSchema)