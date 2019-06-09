import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import Profile from './Profile'
import { Button } from 'semantic-ui-react'
// import logo from '../../assets/images/spring_logo.png'
import './ProfilePage.css'

class ProfilePage extends Component {


  colorSettings = [
    {
      key: 1,
      value: 'red',
      text: 'Red'
    }, {
      key: 2,
      value: 'blue',
      text: 'Blue'
    }, {
      key: 3,
      value: 'green',
      text: 'Green'
    }, {
      key: 4,
      value: 'pink',
      text: 'Pink'
    }, {
      key: 5,
      value: 'grey',
      text: 'Grey'
    }, {
      key: 6,
      value: 'white',
      text: 'White'
    }
  ]


  render() {
    const { user, userInfo, findToken } = this.props;
    return (
      <div>

        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Select Color:
    <input type="text"
              name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form> */}

      </div>
    );
  }

}

export default ProfilePage;