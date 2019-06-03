import React, { Component } from 'react';
import { createUser } from '../../service/index'
import { login, getProfile, signUp } from '../../service/apiServices'
import authService from '../../service/authServices'
import tokenService from '../../service/tokenServices'
import './LoginPage.css'
import { Button, Checkbox, Form, Divider, Grid, Segment } from 'semantic-ui-react'
import { Route, Link, Redirect } from 'react-router-dom'


class LogInPage extends Component {
  constructor() {
    super()

    this.state = {
      signin: false,
      user: {},
      hasError: false
    }

  }

  logErrorToMyService = async () => {
       await this.setState({
          hasError: true
        })
  }


  onSigninFormChange = (event) => {
    const element = event.target
    const name = element.name
    const value = element.value

    this.setState({ [name]: value })

  }


  loginUser = async (e) => {
    e.preventDefault()
    try {
      let credentials = {
        email: this.state.email,
        password: this.state.password,

      }

      const user = await login(credentials)
        this.props.setCurrentUserInfo(user);
        this.setState({
          isSignedIn: true,
          user: user
        })
        this.props.toggleLog()


    } catch (e) {
      this.logErrorToMyService()
      throw e
    }
  }



  signUpUser = async (e) => {
    e.preventDefault()

    try {
      let credentials = {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email
      }


      const user = await signUp(credentials)
      await this.props.setCurrentUserInfo(user);
      this.setState({
        isSignedIn: true,
        user: user
      })
      this.props.toggleLog()
    } catch (e) {
      throw e
    }
  }


  render() {
    const { isSignedIn, user, hasError } = this.state
    const errorMessage = hasError
      ? <p className="warning"> Please enter a valid email & password </p>
      : null

    return (
      <div className="profile-page">
        <div className="log-in-pic"></div>
        <div className="center-me">
          <Segment className="col-shade">

            <Grid columns={2} className="grid" relaxed='very'>
              <Grid.Column>
                <Form onSubmit={this.loginUser} className="form-one">
                  <Form.Field required>
                    <h2>Login</h2>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      onChange={this.onSigninFormChange}
                      placeholder="Email"
                    />

                    <input
                      id="password"
                      type="password"
                      name="password"
                      onChange={this.onSigninFormChange}
                    placeholder="Password" />
                  </Form.Field>

                  {errorMessage}
                  <div className="log-in-but">

                    <Button color='blue' inverted type='submit'>Log In</Button>
                  </div>

                </Form>

              </Grid.Column>
              <Grid.Column>


                <Form onSubmit={this.signUpUser}>
                  <Form.Field required>
                    <h2>SignUp</h2>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      onChange={this.onSigninFormChange}
                      placeholder="Full Name"
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      onChange={this.onSigninFormChange}
                      placeholder="Email"
                    />
                    <input
                      id="password"
                      type="password"
                      name="password"
                      onChange={this.onSigninFormChange}
                      placeholder="Password"
                    />
                  </Form.Field>

                  <br/>
                  <Button color='blue' inverted type='submit'>Sign Up</Button>

                </Form>
              </Grid.Column>
            </Grid>
            <Divider vertical>OR</Divider>

          </Segment>
        </div>
      </div>

    );
  }

}

export default LogInPage;