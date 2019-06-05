import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';
// import Profile from './Profile'
import {Button} from 'semantic-ui-react'
import logo from '../../assets/images/spring_logo.png'
import './Header.css'

class Header extends Component {

  render() {
    const {user, userInfo, findToken } = this.props;
    return (
      <div>

<nav className="ui row four borderless item menu header">
          <div className="right menu right-style">
            <Link className="item item-style" to ='/'><Button onClick={this.props.toggleLog} color='blue'>Sign Out</Button></Link>
          </div>

          <div className="right menu right-style">
            <Link className="item item-style" to ='/'><Button onClick={this.props.toggleLog} color='blue'>Save Beat</Button></Link>
          </div>

          <div className="right menu right-style">
            <Link className="item item-style" to ='/'><Button onClick={this.props.toggleLog} color='blue'>Save Effect</Button></Link>
          </div>

        </nav>
       

      </div>
    );
  }

}

export default Header;