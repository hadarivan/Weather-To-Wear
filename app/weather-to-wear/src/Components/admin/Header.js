import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import '../../css/admin.css'


class Header extends Component {
    active = {
        color:"grey",
        fontWeight:"bold"
    };
    header = {
        listStyle:"none",
        height:"100px",
    };
    render() {
        return(
            <div className="navbar navbar-expand-lg navbar-light bg-light" style={this.header}>
                <NavLink className="adminNav" exact to="/2018-2019/dcs/dev_272" activeStyle={this.active}>
                Home
                </NavLink>
                <NavLink className="adminNav" to="/2018-2019/dcs/dev_272/addProduct" activeStyle={this.active}>
                Add
                </NavLink>
                <NavLink className="adminNav" to="/2018-2019/dcs/dev_272/deleteProduct" activeStyle={this.active}>
                Delete
                </NavLink>
                <NavLink className="adminNav" to="/2018-2019/dcs/dev_272/editPrice" activeStyle={this.active}>
                Edit price
                </NavLink>
                <img className="logo" src="https://txt-dynamic.static.1001fonts.net/txt/dHRmLjcyLjAwMDAwMC5WMlZoZEdobGNsUnZWMlZoY2csLC4w/afternoon-in-stereo-personal-us.regular.png"></img>
                <img width={180} height={120} src="https://cdn.dribbble.com/users/1941918/screenshots/3991993/icloud-download.gif"></img>
            </div>
        );
    }
}
export default Header;