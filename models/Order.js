const mongoose=require('mongoose');

const OrderSchema=mongoose.Schema({
    userId: String,
    status: {type:String, default:"pending"},
    qty: Number,
    amt: Number
})

OrderSchema.set('timestamps',true);

module.exports=new mongoose.model('Order', OrderSchema);