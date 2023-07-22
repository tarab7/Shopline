const mongoose=require('mongoose');

const MessageSchema=mongoose.Schema({
    name: String,
    email: String,
    msg:String
})

MessageSchema.set('timestamps',true)

module.exports=new mongoose.model('Message', MessageSchema);