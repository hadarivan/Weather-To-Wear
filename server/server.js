const express = require('express');
const adminCtl = require('./controller/admin.ctl');
const consumerCtl = require('./controller/consumer.ctl');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser=require('body-parser');


app.set('port',port);
app.use('/', express.static('./public')); // for API
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(//middleware
(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin,X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});

/* All routes of admin */
app.get('/admin', adminCtl.getAllData); // shows all product to the admin.
app.post('/admin/delete', adminCtl.deleteProductById); //admin can delete product by its id 
app.post('/admin/add', adminCtl.addProduct); //admin can add product
app.post('/admin/edit', adminCtl.editPriceById); //admin can delete product by its id 
/* All routes of consumer */
app.get('/consumer', consumerCtl.getProductBySeason); // products by season
app.post('/consumer', consumerCtl.getProductBySGA); // S-season , G-gender, A-age the consumer must enter those params
/* routes for the consumer profile */
app.post('/consumer/SGAP', consumerCtl.getProductBySGAP); // S-season , G-gender, A-age, P-price
app.post('/consumer/SGAB', consumerCtl.getProductBySGAB); // S-season , G-gender, A-age, B-brand
app.post('/consumer/SGAPB', consumerCtl.getProductBySGABP); // S-season , G-gender, A-age, P-price, B-brand
app.all('*', consumerCtl.routeNotFound, adminCtl.routeNotFound);
app.listen(port, () => console.log(`listening on port ${port}`));