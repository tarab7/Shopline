const mongoose=require('mongoose');

const CartSchema=mongoose.Schema({
    userId: String,
    products: [ //Array of objects
        {
            productId: String,
            quantity: {type:Number, default:1},
            size: String
        }
    ]

})

module.exports=new mongoose.model('Cart', CartSchema);