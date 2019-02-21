import React, {Component} from 'react';
import '../../css/consumer.css'
import Weather from '../consumer/weatherCity'

let choice;

class filterProduct extends Component
{
    constructor(props){
        super(props)
        this.state={editing:false,
          products:[],
          gender:'female',
          age_range:'adult',
          price:null,
          brand:null,
          errors: {}
        }


      this.setAgeRange=this.setAgeRange.bind(this)
      this.setGender=this.setGender.bind(this)
      this.edit=this.edit.bind(this)
      this.filter=this.filter.bind(this)
      this.eachProduct=this.eachProduct.bind(this)
      this.setPrice=this.setPrice.bind(this)
      this.setBrand=this.setBrand.bind(this)
      this.nextID=this.nextID.bind(this)
      this.add=this.add.bind(this)
      this.renderForm=this.renderForm.bind(this)
      this.renderUI=this.renderUI.bind(this)

    }

    setGender(event)
    {
        this.setState({gender:event.target.value})
    }
    setAgeRange(event)
    {
        this.setState({age_range:event.target.value})
    }
    setPrice(event)
    {
        this.setState({price:event.target.value})
    }
    setBrand(event)
    {
        this.setState({brand:event.target.value})
    }
    edit(){
      console.log(this.state.gender)
      if(this.state.gender!=='' && this.state.age_range !=='')
        this.setState({editing:true})
      if(this.state.price !== null && this.state.brand === null) choice = 1
      if(this.state.price === null && this.state.brand !== null) choice = 2
      if(this.state.brand !== null && this.state.price !== null)  choice = 3
      this.filter();
    
    }

//change according to the user values
    filter() { 
        let url = `https://weather-to-wear-shahar-hadar.herokuapp.com/consumer`
        if(choice === 1 ) {
            url=`https://weather-to-wear-shahar-hadar.herokuapp.com/consumer/SGAP`
            fetch(`${url}`,
            {method:'POST',
            body:`gender=${this.state.gender}&age_range=${this.state.age_range}&price=${this.state.price}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
         }})
        .then(res => res.json())
        .then(e => e.map(item =>
            this.add({id: item.id, product_type: item.product_type, brand: item.brand, season: item.season, gender: item.gender, age_range:item.age_range, price:item.price, image:item.image})))
        .catch(err=>console.log(err))
        }
        else if(choice === 2 ) 
        {
            url=`https://weather-to-wear-shahar-hadar.herokuapp.com/consumer/SGAB`
            fetch(`${url}`,
            {method:'POST',
            body:`gender=${this.state.gender}&age_range=${this.state.age_range}&brand=${this.state.brand}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
         }})
        .then(res => res.json())
        .then(e => e.map(item =>
            this.add({id: item.id, product_type: item.product_type, brand: item.brand, season: item.season, gender: item.gender, age_range:item.age_range, price:item.price, image:item.image})))
        .catch(err=>console.log(err))
        }
        else if(choice === 3 ) 
        {
            url=`https://weather-to-wear-shahar-hadar.herokuapp.com/consumer/SGAPB`
            fetch(`${url}`,
            {method:'POST',
            body:`gender=${this.state.gender}&age_range=${this.state.age_range}&price=${this.state.price}&brand=${this.state.brand}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
         }})
        .then(res => res.json())
        .then(e => e.map(item =>
            this.add({id: item.id, product_type: item.product_type, brand: item.brand, season: item.season, gender: item.gender, age_range:item.age_range, price:item.price, image:item.image})))
        .catch(err=>console.log(err))
        }
        else {
        console.log("else")
        fetch(`${url}`,
            {method:'POST',
            body:`gender=${this.state.gender}&age_range=${this.state.age_range}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
         }})
        .then(res => res.json())
        .then(e => e.map(item =>
            this.add({id: item.id, product_type: item.product_type, brand: item.brand, season: item.season, gender: item.gender, age_range:item.age_range, price:item.price, image:item.image})))
        .catch(err=>console.log(err))
        }
      
      }

// destructor + default values
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
      {console.log(item)}
        <div className="card-body">
          <img src={item.image}width={200} height={200} alt="product"/>
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
// the user enter sport type and best record, shows all the relevant entries 
    renderForm(){
      return(
        <div className="filter">
        <label>
        gender*:&nbsp;
        <input type="text" placeholder="Please enter gender" name="gender" value={this.state.gender} onChange={this.setGender}/>
        </label>
        <label>
        age range*:&nbsp;
        <input type="text" name="ageRange" placeholder="Please enter age range" value={this.state.age_range} onChange={this.setAgeRange}/>
        </label>
        <label>
        price:&nbsp;
        <input type="text" name="ageRange" value={this.state.price} onChange={this.setPrice}/>
        </label>
        <label>
        brand:&nbsp;  
        <input type="text" name="ageRange" value={this.state.brand} onChange={this.setBrand}/>
        </label>
        &nbsp;        
        <button type="submit" className="btn btn-info" onClick={this.edit}>Filter</button>
    </div>
      )
    }

    renderUI(){
      return(
        <div>
        <Weather/>
        <div className="body">
        <div className="productList">
        <h3>All Products with filter</h3>
        { this.state.products.map(this.eachProduct) }
        </div>
        </div>
        </div>
      )
    }

    render() {
        return this.state.editing? this.renderUI():this.renderForm();
    }
}

export default filterProduct