const mongoose = require('mongoose');
const Product = require('../models/product');

module.exports = {
async getAllData(req, res) {    //admin get all data
    const result = await Product.find({})
    if(result.length===0) res.send("No product was found")
    else if(result.length>0) res.json(result);
    else res.status(404).send('not found');
},
async deleteProductById(req, res) {    //admin delete by id
    const {id=null} = req.body;
    const result = await Product.findOneAndDelete({id})
    console.log(result);
    if(result==null) res.send("No products was found") // checks if id exist if exist then delete
    else if(result) res.json(result);
    else res.status(404).send('not found');
},
async addProduct(req, res) { //add product
    const {
        id=null, 
        product_type=null, 
        brand=null, 
        season=null, 
        gender=null,
        age_range=null,
        price=null,
        image=null
    } = req.body;
    const result= await Product.find({id}); // checks if id already exist if not create a new product
    console.log(result.length);
    if(result.length===0 && id!== null && product_type!=="" && brand !== "" && season !=="" && gender !== "" && age_range!=="" && price !== "" && image!==""){
        console.log(price);
    const product = new Product({id, product_type, brand,season, gender,age_range,price,image})

    product.save(function (err) {
        if (err) { 
            handleError(res, err);
        }
        else {
            res.send(product);
        }
    });
    }
    else if (result.length===0) res.send("Please enter all params")
    else if(result.length>0) res.send("Id already exists");
    else res.status(404).send('not found')
},
async editPriceById(req, res){  //edit product price by id
    const {id=null, price=null} = req.body;
    const result =await Product.findOneAndUpdate({id},{$set:{price}},{});
    console.log(price);
    if(result==null || price==="") res.send("No products was found")  // checks if id exist if exist then edit
    else if(result) res.json(result);
    else res.status(404).send('not found');
},
async routeNotFound(req, res){  //show product by season,gender,age,brand,price
    return res.send("Route not found, please try a different one");
}
}