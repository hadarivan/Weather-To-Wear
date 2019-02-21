const mongoose = require('mongoose');
const Product = require('../models/product');
let request = require('request');
let request1 = require('request');


let lat,lon,temp;
let apiKeyWeather = 'ef111059da90ca74c75daf9c9e9f7996'
let apiKeyLocation = '95279036ab91488c8145186607ef0040'
let urlLocation =`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKeyLocation}`
let season;

request1(urlLocation, function (err, response, body) {
    if(err){
      console.log('error:', error);
    } else {
      obj = JSON.parse(body);
      lat = obj.latitude;
      lon = obj.longitude
      getLocation(lon,lat)
    }
  });
   
function getLocation(lon, lat) {

console.log(lon)
let urlWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`

request(urlWeather, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    obj = JSON.parse(body);
    console.log(obj);
    temp = obj.main.temp- 273.15;
    if(temp < 15) season ='winter';
    if(temp > 15 && temp < 20 ) season='autumn';
    if(temp > 20 && temp < 25 ) season='spring';
    if(temp > 25) season ='summer';
    console.log(season);
    console.log(temp);
  }
});};
 

module.exports = {
    async getProductBySeason(req, res){  //show product by season
        //const {season=null} = req.params; 
        const result =await Product.find({season})
        const ip =req.headers['x-forwarded-for']
        console.log(ip);
        if(result.length===0) res.send("No products was found")
        else if(result.length>0) res.json(result);
        else res.status(404).send('not found');
    },
    async getProductBySGA(req, res){  //show product by season,gender,age
        //const {season=null} = req.params; 
        const {gender=null, age_range = null} = req.body; 
        if(gender===null || age_range===null) //consumer must enter gender and age
            return res.status(404).json("You must enter age range and gender");
        const result =await Product.find({season, gender, age_range})
        if(result.length===0) res.send("No products was found")
        else if(result.length>0) res.json(result);
        else res.status(404).send('not found');
    },
    async getProductBySGAP(req, res){  //show product by season,gender,age,price
        //const {season=null} = req.params; 
        let result;
        const {gender=null, age_range = null, price=null} = req.body;
        if(gender===null || age_range===null) 
            return res.status(404).json("You must enter age range and gender"); 
        console.log(price);
        if(price!==null)
        result =await Product.find({season, gender, age_range,price:{$lte:parseInt(price),$gte:0}});
        else result =await Product.find({season, gender, age_range});
        if(result.length===0) res.send("No products was found")
        else if(result.length>0) res.json(result);
        else res.status(404).send('not found');
    },
    async getProductBySGAB(req, res){  //show product by season,gender,age,brand
        //const {season=null} = req.params; 
        const {gender=null, age_range = null, brand= null} = req.body; 
        if(gender===null || age_range===null)
            return res.status(404).json("You must enter age range and gender");
        const result =await Product.find({season, gender, age_range, brand})
        if(result.length===0) res.send("No products was found")
        else if(result.length>0) res.json(result);
        else res.status(404).send('not found');
    },
    async getProductBySGABP(req, res){  //show product by season,gender,age,brand,price
        //const {season=null} = req.params; 
        const {gender=null, age_range = null, brand=null, price=null} = req.body; 
        if(gender===null || age_range===null)
            return res.status(404).json("You must enter age range and gender");
        if(price!==null)
            result =await Product.find({season, gender, age_range,price:{$lte:parseInt(price),$gte:0},brand});
        else result =await Product.find({season, gender, age_range,brand});
        if(result.length===0) res.send("No products was found")
        else if(result.length>0) res.json(result);
        else res.status(404).send('not found');
    },
    async routeNotFound(req, res){  //show product by season,gender,age,brand,price
        return res.send("Route not found, please try a different one");
    }
}

