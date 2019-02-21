import React, { Component } from 'react';
import '../../css/admin.css'


class ProductList extends Component {

  constructor(props) {
    super(props)
    this.state={
      products:[],
      redirect:false
        }
  
    this.add=this.add.bind(this)
    this.eachProduct=this.eachProduct.bind(this)
    this.nextID=this.nextID.bind(this)
  }

  componentDidMount() {
    const url = 'https://weather-to-wear-shahar-hadar.herokuapp.com/admin';
    fetch(url)
    .then(res => res.json())
    .then(data => data.map(item =>
    this.add({id: item.id, product_type: item.product_type, brand: item.brand, season: item.season, gender: item.gender, age_range:item.age_range, price:item.price, image:item.image})))
    .catch(err => console.error(err));
}
add({ event = null, id = null, product_type=null, brand=null, season=null, gender=null, age_range=null, price=null, image=null }) {
  console.log(event, id, product_type, brand, season, gender, age_range, price, image)
  this.setState(prevState => ({
  products: [
      ...prevState.products, {
      id: id !== null ? id : this.nextID(prevState.products),
      product_type: product_type,
      brand: brand,
      season:season,
      gender:gender,
      age_range:age_range,
      price:price,
      image:image
      }]
  }))
}
eachProduct(item, i) {
  return (
    <div
      key={ `container${item.id}` }
      className="card"
      style={ { width: '18rem', marginBottom: '7px' } }
    >
      <div className="card-body">
        <img src={item.image} width={200} height={200} alt="product"/>
        <h5>price: {item.price}</h5>
        <br/>
      </div>
    </div>
  );
}

// default values + Array.reduce
nextID(products = []) {
  let max = products.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0)
  return ++max
}

render() {
  return (
    <div className="AdminList">
      <h3>All products</h3>
      { this.state.products.map(this.eachProduct) }
    </div>
  );
}
}

export default ProductList;