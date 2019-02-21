import React, {Component} from 'react';
import '../../css/admin.css'


class deleteProduct extends Component
{
    constructor(props){
        super(props)
        this.state={editing:false,
          products:[],
          id:null,
          error:false
        }


      this.edit=this.edit.bind(this)
      this.delete=this.delete.bind(this)
      this.eachProduct=this.eachProduct.bind(this)
      this.nextID=this.nextID.bind(this)
      this.add=this.add.bind(this)
      this.renderForm=this.renderForm.bind(this)
      this.renderUI=this.renderUI.bind(this)
      this.setId=this.setId.bind(this)
      this.manageError=this.manageError.bind(this)

    }
    manageError() {
      this.setState({error:true})
    }
    setId(event) {
        this.setState({id:event.target.value})
    }

    edit() {
        this.setState({editing:true})
        this.delete();
}

//change according to the user values
    delete() { 
        const url = `https://weather-to-wear-shahar-hadar.herokuapp.com/admin/delete`
        fetch(`${url}`,
            {method:'POST',
            body:`id=${this.state.id}`,
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
        id="delete"
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
        &nbsp;        
        <button type="submit" className="btn btn-info" onClick={this.edit}>Delete</button>
    </div>
      )
    }

    renderUI(){
      return(
        <div className="AdminList">
        <h3>{this.state.error ? <div><h3>Possible errors</h3>1.Id doesn't exist</div>:<div><h3>Deleted product</h3> { this.state.products.map(this.eachProduct) }</div>}</h3>
        </div>
      )
    }

    render() {
        return this.state.editing? this.renderUI():this.renderForm();
    }
}

export default deleteProduct