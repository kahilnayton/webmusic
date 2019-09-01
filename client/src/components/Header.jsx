import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import {  Nav, Navbar } from 'react-bootstrap'
import { Button} from 'semantic-ui-react'
import logo from '../assets/images/spring_logo.png'
import '../App.css'

class Header extends Component {
  constructor() {
    super() 
    this.state = {
      isToggleOn: false
    }
  }

  handleClick () {
    this.setstate(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render() {
    let menuActive = this.state.isToggleOn ? 'is-active' : '';
    // const { user, userInfo, findToken } = this.props;
    return (
      <div className="nav">
        <div className={'nav-right nav-menu' + menuActive}>
          <Navbar className="ui row four borderless item menu header" pointer="">
            <Nav className="naviagate">
              <Nav.Link className="item item-style" to='/'>
                <Button onClick={this.props.toggleLog} color='blue'>Sign Out</Button>
              </Nav.Link>
              <Nav.Link className="item item-style" to='/'>
                <Button onClick={this.props.toggleLog} color='blue'>Save Beat</Button></Nav.Link>
              <Nav.Link className="item item-style" to='/'>
                <Button inverted color="blue"
                  color='blue'>Save Theme</Button>
              </Nav.Link>
              <Link to='/'><Button inverted color="orange"
            onClick={() => this.toggleLog()}>Logout
           
            </Button>
            </Link>
            </Nav>
                </Navbar>
        </div>

        <span className="nav-toggle" onClick={this.handleClick}>
          <span></span>
          <span></span>
          <span></span>

        </span>

      </div>

    );
  }

}

export default Header;