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

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }


  render() {
    let menuActive = this.state.isToggleOn ? 'is-active' : '';
    const { track } = this.state
    return (
      <div className="App">
        <div className={'nav-right nav-menu' +menuActive}>
          <Navbar bg="dark" variant="dark" pointer="">
            <Navbar.Brand href="/">WebMusic
            <img
              src="/kk.png"
              width="30"
              height="30"
              className="logo-header"
              alt="React Bootstrap logo"
            />
            </Navbar.Brand>
            <Nav className="navigate">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/pickasong">Pick Song</Nav.Link>
              <Nav.Link href="/toptensongs">Show Top Ten</Nav.Link>
              <Nav.Link href="/help">Help</Nav.Link>
            </Nav>
          </Navbar>
        </div>
        {/* ****** Hamburger ****** */}
        <span className="nav-toggle" onClick={this.handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </span>

        {/* ****** Send props down ****** */}
        {/* <main>
          <Route path="/" exact component={Home} />
          <Route path="/help" component={Help} />
          <Route path="/pickasong"
            render={() => <SearchForm />} />
          <Route path="/toptensongs"
            render={() => <Tracks track={track} />} />
        </main> */}

        {/* ***** Footer ******÷ */}
        {/* <Navbar className="Footer" sticky="bottom" bg="dark">
          <Navbar.Brand href="#home">
            <img
              src="/kk.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Navbar> */}
      </div>

    );
  }

}

export default Header;