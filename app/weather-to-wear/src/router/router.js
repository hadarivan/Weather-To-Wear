import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import ConsumerProduct from '../Components/consumer/product'
import filterProduct from '../Components/consumer/filterProduct'
import ConsumerHeader from '../Components/consumer/Header'
import AdminProduct from '../Components/admin/productList'
import AdminHeader from '../Components/admin/Header'
import AddProduct from '../Components/admin/addProduct'
import DeleteProduct from '../Components/admin/deleteProduct'
import editPrice from '../Components/admin/editPrice'
import GoogleLogin from 'react-google-login';
import '../css/consumer.css'

let name;


class ReactRouter extends Component {

    
    constructor(props) {
        super(props)
        this.state={
            editing:1,
            user_name:null,
            password:null
          }

        this.renderWelcome=this.renderWelcome.bind(this)
        this.renderAdmin=this.renderAdmin.bind(this)
        this.renderUser=this.renderUser.bind(this)
        this.editUser=this.editUser.bind(this)
        this.editAdmin=this.editAdmin.bind(this)
        this.responseGoogle=this.responseGoogle.bind(this)
        this.setPassword=this.setPassword.bind(this)
        this.setUserName=this.setUserName.bind(this)
    }

    setUserName(event) {
        this.setState({user_name:event.target.value})
    }
    setPassword(event) {
        this.setState({password:event.target.value})
    }
    responseGoogle = (response) => {
        name=response
        console.log(response)
        this.editUser()
    }

    editUser() {
        this.setState({editing:2})
    }
    editAdmin() {
        if(this.state.password === "123")
            this.setState({editing:3})
        else this.setState({editing:4})
    }
    renderUser() {
        return(
            <React.Fragment>
                <div className="welcome">
                  <h6>Welcome {name.w3.ofa}</h6>
                </div>        
                <ConsumerHeader/>
                <Route exact path="/2018-2019/dcs/dev_272" component={ConsumerProduct}/>
                <Route path="/2018-2019/dcs/dev_272/filterProducts" component={filterProduct}/>
            </React.Fragment>

        )
    }
    renderWelcome() {

    return(
        <div className="welcomePage">
        <React.Fragment>
            <div>
                <h3>Sign in as user</h3>
            </div>
           <GoogleLogin
                clientId="410641317734-i04uscvh9p1mmok07vuj053qkq4sdk64.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
            <br/> <br/>
            <div>
                <h3>Sign in as admin</h3>
                <label>
                     User name:&nbsp;
                <input type="text" className="form-control" name="userName" value={this.state.user_name} onChange={this.setUserName}/>
                </label><br/>
                <label>
                     Password:&nbsp;
                <input type="text" className="form-control" name="password" value={this.state.password} onChange={this.setPassword}/>
                </label><br/>
                <button type="submit" className="btn btn-info" onClick={this.editAdmin}>Sign in</button>
            </div>
        </React.Fragment>
        </div>
    )
    }
    renderAdmin() {
        return(
            <React.Fragment>
                <div className="welcome">
                  <h6>Welcome {this.state.user_name}</h6>
                </div>
                <AdminHeader/>
                <Route exact path="/2018-2019/dcs/dev_272" component={AdminProduct}/>
                <Route exact path="/2018-2019/dcs/dev_272/addProduct" component={AddProduct}/>
                <Route exact path="/2018-2019/dcs/dev_272/deleteProduct" component={DeleteProduct}/>
                <Route exact path="/2018-2019/dcs/dev_272/editPrice" component={editPrice}/>
            </React.Fragment>
        )
    }
    render() {
        let loggedIn = this.state.editing
        let button;
        if(loggedIn===1)
        button = <div>{this.renderWelcome()}</div>
        else if (loggedIn===2)
        button = <div>{this.renderUser()}</div>
        else if (loggedIn ===3)
        button = <div>{this.renderAdmin()}</div>
        else 
        button = <div><h3>Wrong password</h3></div>
        console.log(button)
        return (
            <div>
                {button}
            </div>
        )
    }

}

    
 export default ReactRouter
