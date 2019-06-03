import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';
// import Profile from './Profile'
import {Button} from 'semantic-ui-react'
import logo from '../../assets/images/spring_logo.png'
import './ProfilePage.css'

class ProfilePage extends Component {

  render() {
    const {user, userInfo, findToken } = this.props;
    return (
      <div>

        <nav className="ui stackable four borderless item menu">

          <img className="item logo-style" alt="TF" src={logo} />

          <div className="right menu right-style">
        
            <Link className="item item-style" to ='/'><Button onClick={this.props.toggleLog} color='blue'>Sign Out</Button></Link>
          </div>

        </nav>

        {/* <Route exact path='/'
          render={()=> <Profile
            user ={user}
            userInfo = {userInfo}
            findToken={findToken}
                       />}
        />
        */}

      </div>
    );
  }

}

export default ProfilePage;