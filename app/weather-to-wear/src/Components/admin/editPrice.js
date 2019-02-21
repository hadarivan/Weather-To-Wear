import React, {Component} from 'react';
import '../../css/admin.css'

class editPrice extends Component
{
    constructor(props){
        super(props)
        this.state={editing:false,
          products:[],
          id:null,
          price:null,
          error:false
        }


      this.edit=this.edit.bind(this)
      this.editPrice=this.editPrice.bind(this)
      this.eachProduct=this.eachProduct.bind(this)
      this.nextID=this.nextID.bind(this)
      this.add=this.add.bind(this)
      this.renderForm=this.renderForm.bind(this)
      this.renderUI=this.renderUI.bind(this)
      this.setId=this.setId.bind(this)
      this.setPrice=this.setPrice.bind(this)
      this.manageError=this.manageError.bind(this)

    }
    setPrice(event) {
        this.setState({price:event.target.value})
    }
    setId(event) {
        this.setState({id:event.target.value})
    }

    edit() {
        this.setState({editing:true})
        this.editPrice();
}
manageError() {
  this.setState({error:true})
}

//change according to the user values
    editPrice() { 
        const url = `https://weather-to-wear-shahar-hadar.herokuapp.com/admin/edit`
        fetch(`${url}`,
            {method:'POST',
            body:`id=${this.state.id}&price=${this.state.price}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
         }})
        .then(res => res.json())
        .then(item => this.add({id: item.id, price:item.price, image:item.image}))
        .catch(err => this.manageError())

      }

// destructor + default values
add({ event = null, id = null, price=null, image=null }) {
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
        id="edit"
        style={ { width: '18rem', marginBottom: '7px' } }
      >
      {console.log(item)}
        <div className="card-body">
          <img src={item.image}width={200} height={200} alt="product"/>
          <h5>price: {this.state.price}</h5>
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
        price:&nbsp;
        <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.setPrice}/>
        </label><br/>
        &nbsp;        
        <button type="submit" className="btn btn-info" onClick={this.edit}>Update</button>
    </div>
      )
    }

    renderUI(){
      return(
        <div className="AdminList">
        <h3>{this.state.error ? <div><h3>Possible errors</h3>1.Id doesn't exist</div>:<div><h3>Edited price</h3> { this.state.products.map(this.eachProduct) }</div>}</h3>
        </div>
      )
    }

    render() {
        return this.state.editing? this.renderUI():this.renderForm();
    }
}

export default editPrice