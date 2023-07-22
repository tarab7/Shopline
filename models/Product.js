const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({
    title: String,
    desc: String,
    img: String,
    category: Array,
    color: String,
    size: Array,
    price: Number
})

ProductSchema.set('timestamps',true)

module.exports=new mongoose.model('Product', ProductSchema);

/*
{
    "title": "SEASONS Running Men's DOWN JACKET",
    "desc": "Conquer winter in the SEAONS down jacket, featuring innovative warmCELL technology – a thermal insulation that traps heat.",
    "img": "https://firebasestorage.googleapis.com/v0/b/e-commerce-6f191.appspot.com/o/files%2FSEASONS-Running-Men's-DOWN-JACKET.avif_1689958674385?alt=media&token=ae637fa8-f337-4faf-b389-cfbfd0941886",
    "category": [
        "Jackets",
        "Men"
    ],
    "color": "Brown",
    "size": ["S", "M", "L","XL"],
    "price": 2499
}
*/