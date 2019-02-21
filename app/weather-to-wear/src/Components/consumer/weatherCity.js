import React, { Component } from 'react';
import '../../css/consumer.css'
import { IoIosPartlySunny , IoIosSunny, IoIosSnow} from "react-icons/io";

class WeatherCity extends Component {

  constructor(props) {
    super(props)
    this.state = {
      temp1:null,
      temp2:null,
      temp3:null
    }
  } 
  componentDidMount() {
    const apiKey='ef111059da90ca74c75daf9c9e9f7996'
    const london ='london'
    const newYork ='new york'
    const Samui = 'ko samui'
    const url1 = `http://api.openweathermap.org/data/2.5/weather?q=${london}&appid=${apiKey}`;
    const url2 = `http://api.openweathermap.org/data/2.5/weather?q=${newYork}&appid=${apiKey}`;
    const url3 = `http://api.openweathermap.org/data/2.5/weather?q=${Samui}&appid=${apiKey}`;
    fetch(url1)
    .then(res => res.json())
    .then(e => {
        this.setState({temp1:Number.parseFloat(e.main.temp-273.15).toFixed(2)})
    })
    .catch(err => console.error(err));
    fetch(url2)
    .then(res => res.json())
    .then(e => {
        this.setState({temp2:Number.parseFloat(e.main.temp-273.15).toFixed(2)})
    })
    .catch(err => console.error(err));
    fetch(url3)
    .then(res => res.json())
    .then(e => {
        this.setState({temp3:Number.parseFloat(e.main.temp-273.15).toFixed(2)})
    })
    .catch(err => console.error(err));
}

render() {
  return (
      <div className="weather">
    <h3>Weather</h3>
        <div className="boxes">
            <div className="box">
            <br/>
            <h3>London</h3>
            <h3>{this.state.temp1}</h3>
            <IoIosPartlySunny className="cloud"/>
            </div>
            <div className="box">
            <br/>
            <h3>New York</h3>
            <h3>{this.state.temp2}</h3>
            <IoIosSnow className="snow"/>
            </div>
            <div className="box">
            <br/>
            <h3>Koh Samui</h3>
            <h3>{this.state.temp3}</h3>
            <IoIosSunny className="sun"/>
            </div>
        </div>
    </div>
  );
}
}

export default WeatherCity;