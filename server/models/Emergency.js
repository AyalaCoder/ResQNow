const mongoose=require("mongoose")
const emergencySchema=new mongoose.Schema({
    title: String,           
    description: String,       
    address: String,          
    location: {                
      lat: Number,
      lng: Number
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
    updatedAt: Date,         
    volunteersResponded: [  
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        respondedAt: Date
      }
    ]
  }
  )

module.exports=mongoose.model('Emergency',emergencySchema)