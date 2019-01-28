import React, { Component } from "react"
import { Router, Route, Switch } from "react-router"
import createBrowserHistory from 'history/createBrowserHistory'
import axios from 'axios'

import Ask from './routes/ask/ask'
import Jobs from './routes/jobs/jobs'
import Upload from './routes/upload/upload'
import Datasets from './routes/datasets/datasets'
import Signup from './routes/login/signup'
import Login from './routes/login/login'
import Logout from './routes/login/logout'
import Account from './routes/account/account'
import AskoNavbar from './navbar'
import AskoFooter from './footer'

const history = createBrowserHistory()

export default class Routes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: null,
      logged: false,
      user: {}
    }
  }

  componentDidMount() {

    let requestUrl = '/api/start'
    axios.get(requestUrl)
    .then(response => {
      console.log(requestUrl, response.data)
      this.setState({
        error: false,
        errorMessage: null,
        user: response.data.user,
        logged: response.data.logged,
        version: response.data.version,
        footerMessage: response.data.footer_message
      })
    })
    .catch( (error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <AskoNavbar logged={this.state.logged} user={this.state.user}/>
          <Switch>
            <Route path="/" exact component={() => (<Ask user={this.state.user} logged={this.state.logged} />)} />
            <Route path="/login" exact component={() => (<Login setStateNavbar={p => this.setState(p)} />)} />
            <Route path="/signup" exact component={() => (<Signup setStateNavbar={p => this.setState(p)} />)} />
            <Route path="/logout" exact component={() => (<Logout setStateNavbar={p => this.setState(p)} />)} />
            <Route path="/account" exact component={() => (<Account user={this.state.user} setStateNavbar={p => this.setState(p)} />)} />
          </Switch>
          <br />
          <br />
          <AskoFooter version={this.state.version} message={this.state.footerMessage} />
        </div>
      </Router>
    )
  }
}
