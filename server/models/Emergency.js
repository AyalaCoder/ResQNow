const mongoose=require("mongoose")
const emergencySchema=new mongoose.Schema({
    title: {
      type:String, 
      required:true}, 

    description: {
      type:String, 
      required:true},              
    location: {               
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    urgency: {               
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    status: {              
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
    },
    createdAt: Date,                
    volunteersResponded: [  
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        respondedAt: Date
      }
    ]
  }
  )

module.exports=mongoose.model('Emergency',emergencySchema)