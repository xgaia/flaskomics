import React, { Component } from 'react'
import { Form, FormGroup, FormText, Label, Input, Button, CustomInput, Progress } from 'reactstrap'
import axios from 'axios'
import update from 'react-addons-update'
import PropTypes from 'prop-types'
import AskoContext from '../../components/context'

export default class UploadUrlForm extends Component {
  static contextType = AskoContext
  constructor (props) {
    super(props)

    this.state = {
      url: '',
      disabled: true,
      progressAnimated: true,
      progressValue: 0,
      progressDisplay: "",
      progressColor: "success"
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cancelRequest
  }


  isUrl(s) {
     var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
     return regexp.test(s);
  }

  handleChange (event) {
    this.setState({
      url: event.target.value,
      disabled: !this.isUrl(event.target.value)
    })
  }

  handleSubmit (event) {

    let requestUrl = '/api/files/upload_url'
    let data = {
      url: this.state.url
    }

    this.setState({
      disabled: true,
      progressAnimated: true,
      progressValue: 99,
      progressDisplay: "99 %",
      progressColor: "success"
    })

    axios.post(requestUrl, data, { baseURL: this.context.proxyPath, cancelToken: new axios.CancelToken((c) => { this.cancelRequest = c }) })
      .then(response => {
        console.log(requestUrl, response.data)
        this.setState({
          disabled: false,
          progressAnimated: false,
          progressValue: 100,
          progressDisplay: "100 %",
          progressColor: "success"
        })

        // load file component
        let requestUrlFiles = '/api/files'
        axios.get(requestUrlFiles, { baseURL: this.context.proxyPath, cancelToken: new axios.CancelToken((c) => { this.cancelRequest = c }) })
          .then(response => {
            console.log(requestUrlFiles, response.data)
            this.props.setStateUpload({
              files: response.data.files
            })
          })
          .catch(error => {
            console.log(error, error.response.data.errorMessage)
          })
      })
      .catch(error => {
        console.log(error, error.response.data.errorMessage)
        this.setState({
          disabled: false,
          progressAnimated: false,
          progressValue: 100,
          progressDisplay: "ERROR",
          progressColor: "error"
        })
      })

  }

  render () {
    return (
      <div>
        <Input onChange={this.handleChange} value={this.state.url} type="url" name="url" id="url" placeholder="Enter file URL" />
        <Progress animated={this.state.progressAnimated} color={this.state.progressColor} value={this.state.progressValue}>{this.state.progressDisplay}</Progress>
        <br />
        <Button disabled={this.state.disabled} onClick={this.handleSubmit} color="secondary">Upload</Button>
      </div>
    )
  }
}

UploadUrlForm.propTypes = {
  setStateUpload: PropTypes.func
}