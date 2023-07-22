const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();

const Jwt=require('jsonwebtoken');
const jwtkey=process.env.JWT_KEY;

app.use(express.json());
app.use(cors());

require('./connect');


app.get("/",(req, res)=>{
    res.send("backend working...");
})



//------------------------------------------------------------------
const User=require('./models/User');
//USER SIGN UP
app.post('/signup', async(req, res)=>{
    let data=new User(req.body);
    let result=await data.save();
    result=result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtkey, (err, token)=>{
        if(err)
        {
            res.send({result:"Somethng went wrong. Please try after some time!"});
        }
        res.send({result, auth: token})
    })
})


//USER LOGIN
app.post("/login", async(req, res)=>{
    let user;
    if(req.body.email && req.body.password)
    {
        user=await User.findOne(req.body).select("-password");  
    }
    if(user)
    {
        Jwt.sign({user}, jwtkey, {expiresIn:"2h"}, (err, token)=>{
            if(err)
            {
                res.send({result:"Somethng went wrong. Please try after some time!"});
            }
            res.send({user, auth: token})
        })
    }
    else
    {
        res.send({result:"User not found"});
    }
})



//------------------------------------------------------------------
const Product=require('./models/Product');
const multer=require('multer');
const {getStorage, ref, getDownloadURL, uploadBytesResumable}=require("firebase/storage")
require("./config")

const storage=getStorage();
const upload=multer({storage:multer.memoryStorage()});

app.post('/addProductImg', upload.single("filename"), async(req, res)=>{
    //let data=new Product(req.body);
    
    let dateTime=Date.now();
    const storageRef=ref(storage, `files/${req.file.originalname+"_"+dateTime}`)
    const metadata={
        contentType: req.file.mimetype
    }
    const snapshot=await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL=await getDownloadURL(snapshot.ref);

    res.send({url: downloadURL});
})

app.post('/addProduct', async(req, res)=>{
    let data=new Product(req.body);
    let result=await data.save();
    res.send(result);
})


//UPDATE PRODUCT
app.put('/updateProduct/:id', verifyToken, async(req, res)=>{
    let result=await Product.updateOne({_id:req.params.id}, {$set:req.body});
    res.send(result)
})

//DELETE PRODUCT
app.delete('/deleteProduct/:id', verifyToken, async(req, res)=>{
    let result=await Product.deleteOne({_id: req.params.id});
    res.send(result);
})

//GET SINGLE PRODUCT
app.get('/getProduct/:id', async(req, res)=>{
    let result=await Product.findOne({_id: req.params.id});
    res.send(result);
})

//GET PRODUCTS (CATEGORY, NEW, ALL)
app.get('/products', async(req, res)=>{
    const qnew=req.query.new;  
    const qCategory=req.query.category;
    let result; //Result isme store hoga
    if(qnew)
    {
        result=await Product.find().sort({createdAt:-1}).limit(1);
        //Sort krdo by their dates upto size limit 5
    }
    else if(qCategory)
    {
        result=await Product.find({
            category:
                {
                    $in: [qCategory]    //category array me find krne ka way
                }
        })
    }
    else{
        result=await Product.find();    //Koi query nahi hai to simple saare products le aao
    }
    res.send(result);
})

//SEARCH PRODUCTS
app.get("/search/:key", async(req, res)=>{
    let result=await Product.find({
        //Multiple fields me search krne ke liye we use "$or"
        "$or":[                             
            {title: {$regex: req.params.key}},
            {category: {
                $in: [req.params.key]    //category array me find krne ka way
            }}
        ]
    });
    res.send(result);
})


//------------------------------------------------------------------
const Cart=require('./models/Cart');

//CREATE CART
app.post('/addCart',  async(req, res)=>{
    let data=new Cart(req.body);
    let result=await data.save();
    res.send(result)
})

//UPDATE CART
app.put('/updateCart/:id', async(req, res)=>{
    let result=await Cart.updateOne({userId:req.params.id}, { $push: { "products": req.body }});
    res.send(result)
})

//DELETE PRODUCT
app.delete('/deleteCart/:id', verifyToken, async(req, res)=>{
    let result=await Cart.deleteOne({_id: req.params.id});
    res.send(result);
})

//GET CART
app.get("/getCart/:user_id", async(req, res)=>{
    let result=await Cart.findOne({userId: req.params.user_id});
    if(result)
        res.send(result);
    else
        res.send({notfound:"notfound"});
})

//GET ALL CARTS OF ALL USER
app.get("/getAllCarts", verifyToken, async(req, res)=>{
    let result=await Cart.find();
    res.send(result);
})

//------------------------------------------------------------------
const Order=require('./models/Order');

//CREATE ORDER
app.post('/addOrder', async(req, res)=>{
    let data=new Order(req.body);
    let result=await data.save();
    res.send(result)
})

//UPDATE ORDER
app.put('/updateOrder/:id', verifyToken, async(req, res)=>{
    let result=await Order.updateOne({_id:req.params.id}, {$set:req.body});
    res.send(result)
})

//DELETE ORDER
app.delete('/deleteOrder/:id', verifyToken, async(req, res)=>{
    let result=await Order.deleteOne({_id: req.params.id});
    res.send(result);
})

//GET ORDER OF A USER
app.get("/getOrder/:user_id",async(req, res)=>{
    let result=await Order.find({userId: req.params.user_id});
    res.send(result);
})

//GET ALL ORDERS OF ALL USER
app.get("/getAllOrders", verifyToken, async(req, res)=>{
    let result=await Order.find();
    res.send(result);
})


//------------------------------------------------------------------
const Message=require("./models/Messages");
app.post('/addMsg', async(req, res)=>{
    let data=new Message(req.body);
    let result=await data.save();
    res.send(result)
})

//------------------------------------------------------------------

//VERIFY TOKEN
function verifyToken(req, res, next){
    let token=req.headers.authorization;
    console.log("middleware called "+token);
    if(token)
    {
        token=token.split(' ')[1];
        console.log(token);
        Jwt.verify(token, jwtkey, (err, valid)=>{
            if(err)
            {
                res.status(401).send({result: "Please provide valid token"});
            }
            else
            {
                next();
            }
        })
    }
    else
    {
        //Token hi nhi hai
        res.status(403).send({result: "Please add token with header"});
    }
}



//------------------------------------------------------------------

const PORT=process.env.PORT;
app.listen(PORT);
