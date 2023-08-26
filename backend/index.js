const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { mongoose, models } = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const UserModel = require("./Schema/User");
const DriverModel = require("./Schema/Driver");
const EmailModel = require("./Schema/Email");

//environment variables
const MONGO_URL = process.env.MONGO_URL;
const PUBLIC_URL = 'http://localhost:3000';
const PORT = process.env.PORT;
const jwtSecretKey = process.env.JWT_SECRET;


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  methods: 'GET,POST,PATCH,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
  origin: PUBLIC_URL,
  credentials:true
}));
app.options('*', cors());

app.post("/checkuser", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  if (req.body.email) {
  const email  = req.body.email;
  console.log(email);
    try{
    const UserEmail = await EmailModel.findOne({ email: email });
    if(UserEmail!==null){
      console.log("UserEmail found");
      const userType=UserEmail.userType;
      const email=UserEmail.email;
      if(userType==='user'){
        console.log('user');
        const UserData=await UserModel.findOne({email});
        res.status(200).json(UserData);
      }
      if(userType==='driver'){
        console.log('driver');
        const UserData=await DriverModel.findOne({email});
        res.status(200).json(UserData);
      }
      }
      else{
        console.log(UserEmail);
        res.status(200).json(null);
      }
      
    }
    
    catch(err){
      res.status(200).send(err);
      console.log(err);
    }
  } else {
    res.status(200).json(null);
    console.log('email not found in body');
  }
});
//all the data will be coming to user context function
app.post("/createUser", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const email=req.body.signupEmail;
  const phoneNumber=req.body.signupPhone;
  if(email && phoneNumber){
    try{
      console.log('trying to create user model')
      const EmailRes=await EmailModel.create({
        email:email,
        userType:'user'
      })
      const User = await UserModel.create({
        email:email,
        phoneNumber:phoneNumber,
        userType:'user'
      });
      return res.status(200).json(User);
    }
    catch(err){
      res.status(500).send("Internal Server Error");
    }
  }
});

app.post("/createDriver", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const email=req.params.email;
  const phoneNumber=req.params.phoneNumber;
  if(email && phoneNumber){
    try{
      const EmailRes=await EmailModel.create({
        email:email,
        userType:'driver'
      })

      const Driver = await UserModel.create({
        email:email,
        phoneNumber:phoneNumber,
        userType:'driver'
      });
      return res.status(200).json(Driver);
    }
    catch(err){
      res.status(500).send("Internal Server Error");
    }
  }
});

//api for google login left


app.post('/registerNewUser',async(req,res)=>{
  await mongoose.connect(MONGO_URL);
  const name=req.body.name;
  const address=req.body.address;
  const phoneNumber=req.body.phoneNumber;
  const profilePicture=req.body.profilePicture;
  if(name&&address&&phoneNumber&& profilePicture){
    try{
      const updatedResponse=await UserModel.updateOne(
        {
            "email": email,
        },
        {
            $set:{
                phoneNumber:phoneNumber,
                name:name,
                address:address,
                profilePicture:profilePicture
            }
        });
        if(updatedResponse){
          res.status(200).json("updated");
        }
        else{
          res.status(500).json('error updating');
        }
    }
    catch(err){
      res.status(500).send("Internal Server Error");
    }
  }
  else{
    res.status(500).json('didnt get complete inputs')
  }
});

app.post('/registerNewDriver',async(req,res)=>{
  await mongoose.connect(MONGO_URL);
  const name=req.body.name;
  const address=req.body.address;
  const phoneNumber=req.body.phoneNumber;
  const profilePicture=req.body.profilePicture;
  const drivingLicenseNumber=req.body.drivingLicenseNumber;
  const VehicleNumber=req.body.VehicleNumber;
  const experience=req.body.experience;
  if(name&&address&&phoneNumber&& profilePicture && drivingLicenseNumber && VehicleNumber && experience){
    try{
      const updatedResponse=await UserModel.updateOne(
        {
            "email": email,
        },
        {
            $set:{
                phoneNumber:phoneNumber,
                name:name,
                address:address,
                profilePicture:profilePicture,
                drivingLicenseNumber:drivingLicenseNumber,
                VehicleNumber:VehicleNumber,
                experience:experience,
            }
        });
        if(updatedResponse){
          res.status(200).json("updated");
        }
        else{
          res.status(500).json('error updating');
        }
    }
    catch(err){
      res.status(500).send("Internal Server Error");
    }
  }
  else{
    res.status(500).json('didnt get complete inputs')
  }
});
















maxAge = 24 * 60 * 60;

app.post("/profiledata", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const token = req.body.token;
  if (token) {
    tokenData = jwt.verify(token, jwtSecretKey);
    //console.log(tokenData.email)
    const tokenEmail = tokenData.email;
    //console.log(tokenEmail)
    const UserData = await User.findOne({ email: tokenEmail });
    res.status(200).send(UserData);
  } else {
    res.json(null);
  }
});
/*
app.post('/addtocart', async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const userId = req.body.userId;
  const productId = req.body.userId;
  if (userId && productId) {
    const response= await CartModel.findOne({userId});
    
    if(response!==null){
      if(response.products!==undefined){
      //console.log(response);
      const userId=response.userId;
      const products=response.products;
      console.log(products);
      let count=0;
      let indexOfProduct=0;
      if(products!==undefined){
        if(products!==null && products.length!==0){ 
          console.log("Inside present")     
          const productData=await CartModel.findOne({userId:userId ,"products.productId":productId})
          console.log(productData);
          if(productData.length!==0){
            console.log("product presnt already quantity increase");
            const newQuantity=products[indexOfProduct].productQuantity+1;
            console.log(newQuantity);
            const updatedResponse1=await CartModel.findOneAndUpdate({
              userId:userId
            },
            {
              $set: {
                products: [
                  {
                    productId:productId,
                    productQuantity:newQuantity,
                  },
                ],
              },
            }
            )
            res.status(200).send(updatedResponse1);//ek kam return kar raha hai udhar add karlena
            count=0;
            indexOfProduct=0;
          }
          else{
            console.log("inside else")
            const updatedResponse2 = await CartModel.updateOne(
              { userId:userId },
              {
                $push: {
                  products:
                    {
                     productId:productId,
                     productQuantity:1
                    }
                },
              }
            );
            res.status(200).send(updatedResponse2);
            count=0;
            indexOfProduct=0;
            console.log("success");
          }
        }
        else{
          console.log("inside else")
          const updatedResponse4=await CartModel.findOneAndUpdate({userId:userId},{
              $set: {
                userId:userId,
                products: [
                  {
                    productId: productId,
                    productQuantity:1
                    
                  },
                ],
              },
            
          })
          res.status(200).json('done');
          console.log(updatedResponse4.userId);
          console.log(updatedResponse4.products)
        }
      }
    }
    }
  if(response===null){
    console.log("inside create")
    const initialQuantity=1;
  const updatedResponse3=await CartModel.create({
    userId:userId,
    products:[
      {
        productId:productId,
        productQuantity:initialQuantity,
      }
    ]
  });
  res.status(200).json(updatedResponse3);
  }
}});
*/

app.post("/addtocart", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const userId = req.body.userId;
  const productId = req.body.productId;
  const response = await CartModel.findOne({ userId });
  //console.log(response);
  //console.log(response.products);

  let i = 0;
  let count = 0;
  if (response === null) {
    console.log("inside create");
    const initialQuantity = 1;
    const updatedResponse3 = await CartModel.create({
      userId: userId,
      products: [
        {
          productId: productId,
          productQuantity: initialQuantity,
        },
      ],
    });
    res.status(200).json(updatedResponse3);
  } else {
    const products = response.products;
    console.log("inside else");
    if (products.length === 0) {
      console.log("inside push when length is zero");
      const updatedResponse2 = await CartModel.updateOne(
        { userId: userId },
        {
          $push: {
            products: {
              productId: productId,
              productQuantity: 1,
            },
          },
        }
      );
      res.status(200).send(updatedResponse2);
    } else {
      for (i = 0; i < products.length; i++) {
        const element = products[i].productId;
        if (element === productId) {
          count = count + 1;
        }
      }
      console.log("Inside for loop checking count");
      if (count === 0) {
        console.log("Pushed into array");
        const updatedResponse5 = await CartModel.updateOne(
          { userId: userId },
          {
            $push: {
              products: {
                productId: productId,
                productQuantity: 1,
              },
            },
          }
        );
        res.status(200).send(updatedResponse5);
      } else {
        console.log("product present already, quantity increased");
        const newQuantity = count + 1;
        console.log(newQuantity);
        const updatedResponse1 = await CartModel.findOneAndUpdate(
          {
            products: { $elemMatch: { productQuantity: newQuantity } },
          },
          {
            arrayFilters: [
              {
                userId: userId,
              },
              {
                "products.productId": productId,
              },
            ],
            new: true,
          }
        );
        res.status(200).send(updatedResponse1); //ek kam return kar raha hai udhar add karlena
      }
    }
  }
});

app.post("/cartpage", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const userId = req.body.userId;
  if (userId) {
    const cartData = await CartModel.findOne({ userId });
    const products = cartData.products;
    //console.log(products);
    let ProductsFinalArray = [];
    for (let i = 0; i < products.length; i++) {
      let eachProduct = products[i];
      let eachProductId = products[i].productId;
      let productDetails = await ProductModel.aggregate([
        {
          // first, filter the documents, that contain
          // fields with necessary values
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(
              eachProductId
            ),
          },
        },
        // the following $unwind stages will convert your arrays
        // to objects, so it would be easier to filter the messages
        {
          $unwind: "$categoryItem",
        },
        {
          $unwind: "$categoryItem.itemProducts",
        },
        {
          // filter messages here
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(
              eachProductId
            ),
          },
        },
        {
          // returns only message(s)
          $replaceWith: "$categoryItem.itemProducts",
        },
      ]);
      //console.log(productDetails[0]);
      ProductsFinalArray.push(productDetails[0]);
    }
    //console.log(ProductsFinalArray);
    replydata = {
      ProductsFinalArray: ProductsFinalArray,
      products: products,
    };
    res.status(200).send(replydata);
  } else {
    res.status(400).send("Internal Server Error");
  }
});



app.post("/address", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const AddressName = req.body.name;
  const addressLine1 = req.body.address1;
  const addressLine2 = req.body.address2;
  const phone = req.body.phone;
  const city = req.body.city;
  const state = req.body.state;
  const pincode = req.body.pincode;
  const email = req.body.email;
  try {
    console.log("Inside try");
    const UserData = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          address: [
            {
              addressName: AddressName,
              addressLine1: addressLine1,
              addressLine2: addressLine2,
              phone: phone,
              city: city,
              state: state,
              pincode: pincode,
            },
          ],
        },
      }
    );
    return res.status(200).send({
      UserData: UserData,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.post("/logout", (req, res) => {
  //res.cookie("token", "").json(true);
  res.json(true);
});

app.post("/cardForm", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const nameOnCard = req.body.nameOnCard;
  const numberOnCard = req.body.numberOnCard;
  const expiryMonthOnCard = req.body.expiryMonthOnCard;
  const expiryYearOnCard = req.body.expiryYearOnCard;
  const cvvOnCard = req.body.cvvOnCard;
  const email = req.body.email;
  try {
    console.log("Inside try");
    const UserData = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          paymentInfo: [
            {
              nameOnCard: nameOnCard,
              cardNumber: numberOnCard,
              expiryMonth: expiryMonthOnCard,
              expiryYear: expiryYearOnCard,
              cvv: cvvOnCard,
            },
          ],
        },
      }
    );
    return res.status(200).send({
      UserData: UserData,
    });
  } catch {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/productsFill", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const data = req.body;
  try {
    const catNameDoc = await ProductModel.findOne({
      categoryName: data.categoryName,
    });
    if (catNameDoc) {
      const catItemDoc = await ProductModel.findOne({
        "categoryItem.itemName": data.itemName,
      });
      if (catItemDoc) {
        const productNameDoc = await ProductModel.findOne({
          "categoryItem.itemProducts.name": data.pname,
        });

        if (productNameDoc) {
          console.log("Product already exist");
        } else {
          try {
            const finProduct = await ProductModel.updateOne(
              { "categoryItem.itemName": data.itemName },
              {
                $push: {
                  "categoryItem.$.itemProducts": {
                    name: data.pname,
                    price: data.pprice,
                    description: data.pdesc,
                    imageURL: data.pimg,
                  },
                },
              }
            );
            console.log("New Products Posted");
          } catch (err) {
            console.log(err);
            return res.status(400).send("Server Error");
          }
        }
      } else {
        try {
          const ItemDoc = await ProductModel.updateOne(
            { categoryName: catNameDoc.categoryName },
            {
              $push: {
                categoryItem: {
                  itemName: data.itemName,
                  itemProducts: [
                    {
                      name: data.pname,
                      price: data.pprice,
                      description: data.pdesc,
                      imageURL: data.pimg,
                    },
                  ],
                },
              },
            }
          );
          console.log("new category Item Posted");
        } catch (err) {
          console.log(err);
          return res.status(400).send("Server error");
        }
        console.log("inside else");
      }
    } else {
      try {
        const ProductDoc = await ProductModel.create({
          categoryName: data.categoryName,
          categoryItem: [
            {
              itemName: data.itemName,
              itemProducts: [
                {
                  name: data.pname,
                  price: data.pprice,
                  description: data.pdesc,
                  imageURL: data.pimg,
                },
              ],
            },
          ],
        });
        console.log("New Category Posted");
        return res.status(200).send("Successfully Posted");
      } catch (err) {
        console.log(err);
        return res.status(400).send("Server Error");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.get("/products/:cat/:item", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const gotData = { categoryName: req.params.cat, itemName: req.params.item };
  console.log(gotData);

  try {
    const getCategory = await ProductModel.findOne({
      categoryName: gotData.categoryName,
    });
    if (getCategory) {
      // console.log(getCategory);
      try {
        const getItem = await ProductModel.find({
          "categoryItem.itemName": gotData.itemName,
        });
        if (getItem) {
          const retData = await ProductModel.aggregate([
            {
              $match: { "categoryItem.itemName": gotData.itemName },
            },
            { $unwind: "$categoryItem" },
            { $match: { "categoryItem.itemName": gotData.itemName } },
            { $replaceWith: "$categoryItem" },
          ]);
          console.log(retData[0].itemProducts);
          res.send(retData[0].itemProducts);
        } else {
          console.log("404 /- Not Found");
        }
      } catch (err) {
        console.log("Server responded with Error");
        return res.json({ respondedData: "Server Responded with error" });
      }
    } else {
      console.log("404 /- not Found");
    }
  } catch (err) {
    console.log("Server responded with Error");
    return res.json({ respondedData: "Server Responded with error" });
  }
});

app.post("/specificproduct", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const id = req.body.id;
  console.log(id);
  if (id) {
    try {
      console.log("inside try");
      const sofa = "sofas";
      const product = await ProductModel.aggregate([
        {
          // first, filter the documents, that contain
          // fields with necessary values
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(id),
          },
        },
        // the following $unwind stages will convert your arrays
        // to objects, so it would be easier to filter the messages
        {
          $unwind: "$categoryItem",
        },
        {
          $unwind: "$categoryItem.itemProducts",
        },
        {
          // filter messages here
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(id),
          },
        },
        {
          // returns only message(s)
          $replaceWith: "$categoryItem.itemProducts",
        },
      ]);
      console.log(product);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send("Internal server error");
      console.log(error);
    }
  }
});

app.post("/buyNow", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const postData = req.body;
  console.log(postData);
  try {
    const createOrderDoc = await OrderModel.create({
      userId: postData.userId,
      products: [
        {
          productId: postData.productId,
          productQuantity: postData.productQuantity,
        },
      ],
    });
    res.status(200).send("Successfully Placed Order");
    console.log(createOrderDoc);
  } catch (err) {
    console.log("Order Creation Failed");
    return res.status(400).send("Unable to Process Request");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});