import React, {Component} from 'react';
import '../../css/admin.css'

class filterProduct extends Component
{
    constructor(props){
        super(props)
        this.state={
          error:false,
          editing:false,
          products:[],
          id:null,
          product_type:"",
          brand:"",
          season:"",
          gender:"",
          age_range:"",
          price:"",
          image:""
        }


      this.setAgeRange=this.setAgeRange.bind(this)
      this.setGender=this.setGender.bind(this)
      this.edit=this.edit.bind(this)
      this.addProduct=this.addProduct.bind(this)
      this.eachProduct=this.eachProduct.bind(this)
      this.setPrice=this.setPrice.bind(this)
      this.setBrand=this.setBrand.bind(this)
      this.nextID=this.nextID.bind(this)
      this.add=this.add.bind(this)
      this.renderForm=this.renderForm.bind(this)
      this.renderUI=this.renderUI.bind(this)
      this.setId=this.setId.bind(this)
      this.setImage=this.setImage.bind(this)
      this.setProductType=this.setProductType.bind(this)
      this.setSeason=this.setSeason.bind(this)
      this.manageError=this.manageError.bind(this)

    }
    setId(event) {
        this.setState({id:event.target.value})
    }
    setProductType(event) {
        this.setState({product_type:event.target.value})
    }
    setSeason(event) {
        this.setState({season:event.target.value})
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
    setImage(event) {
        this.setState({image:event.target.value})
        console.log(this.state.image);
    }

    edit(){
        this.setState({editing:true})
        this.addProduct();
    }
    manageError() {
      this.setState({error:true})
    }

//change according to the user values
    addProduct() { 
        const url = `https://weather-to-wear-shahar-hadar.herokuapp.com/admin/add`
        fetch(`${url}`,
            {method:'POST',
            body:`id=${this.state.id}&product_type=${this.state.product_type}&brand=${this.state.brand}&season=${this.state.season}&gender=${this.state.gender}&age_range=${this.state.age_range}&price=${this.state.price}&image=${this.state.image}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
         }})
        .then(res => res.json())
        .then(item => this.add({id: item.id, price:item.price, image:item.image}))
        .catch(err => this.manageError())
      }

// destructor + default values
add({ event = null, id=null, price=null, image=null }) {
    console.log(event, id, price, image)
    this.setState(prevState => ({
    products: [
        ...prevState.products, {
        id: id !== null ? id : this.nextID(prevState.products),
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
        id="add"
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
        <div className="admin">
        <label>
        id:&nbsp;
        <input type="text" className="form-control" name="id" value={this.state.id} onChange={this.setId}/>
        </label><br/>
        <label>
        product type:&nbsp;
        <input type="text" className="form-control" name="product_type" value={this.state.product_type} onChange={this.setProductType}/>
        </label><br/>
        <label>
        brand:&nbsp;  
        <input type="text" className="form-control" name="brand" value={this.state.brand} onChange={this.setBrand}/>
        </label><br/>
        <label>
        season:&nbsp;
        <input type="text" className="form-control" name="season" value={this.state.season} onChange={this.setSeason}/>
        </label><br/>
        <label>
        gender:&nbsp;
        <input type="text" className="form-control" name="gender" value={this.state.gender} onChange={this.setGender}/>
        </label><br/>
        <label>
        age range:&nbsp;
        <input type="text" className="form-control" name="ageRange" value={this.state.age_range} onChange={this.setAgeRange}/>
        </label><br/>
        <label>
        price:&nbsp;
        <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.setPrice}/>
        </label><br/>
        <label>
        image:&nbsp;
        <input type="text" className="form-control" name="image" value={this.state.image} onChange={this.setImage}/>
        </label><br/>
        &nbsp;        
        <button type="submit" className="btn btn-info" onClick={this.edit}>Add</button>
    </div>
      )
    }

    renderUI(){
      return(
        <div className="AdminList">
        <h3>{this.state.error ? <div><h3>Possible errors</h3>1.Id already exist<br/>2.Enter all params</div>:<div><h3>Added product</h3> { this.state.products.map(this.eachProduct) }</div>}</h3>
        </div>
      )
    }

    render() {
        return this.state.editing? this.renderUI():this.renderForm();
    }
}

export default filterProduct