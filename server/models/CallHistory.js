const mongoose=require("mongoose")
const CallHistorySchema = new mongoose.Schema({
  emergency: { type: mongoose.Schema.Types.ObjectId, ref: 'Emergency', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['Accepted', 'Arrived', 'Finished'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports=mongoose.model('CallHistory',CallHistorySchema)