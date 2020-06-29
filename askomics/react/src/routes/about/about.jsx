import React, { Component } from 'react'
import axios from 'axios'
import { Alert, Button, InputGroupAddon, Input, InputGroup } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import ErrorDiv from '../error/error'
import WaitingDiv from '../../components/waiting'
import update from 'react-addons-update'
import PropTypes from 'prop-types'

export default class About extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="container">
        <h2>About</h2>
        <hr />
        <h4>What is AskOmics?</h4>
        <p>
          AskOmics provide a visual representation of the user abstraction as a graph.
          By starting from a node of interest and iteratively selecting its neighbors,
          the user creates a path on an abstraction graph. This path can then be transformed
          into a SPARQL query that can be executed on the original dataset.
        </p>

        <p>
          Visit <a target="_newtab" rel="noopener noreferrer" href="https://askomics.org">askomics.org</a> to learn how to use and deploy AskOmics.
        </p>

        <h4>Usefull links</h4>
        <p>
          <div>
            <a target="_newtab" rel="noopener noreferrer" href="https://flaskomics.readthedocs.io">Docs</a>
          </div>
          <div>
            <a target="_newtab" rel="noopener noreferrer" href="https://github.com/askomics/flaskomics">Github repository</a>
          </div>
          <div>
            <a target="_newtab" rel="noopener noreferrer" href="https://github.com/askomics/flaskomics-docker-compose">Github docker-compose repository</a>
          </div>
        </p>
        <h4>Need help?</h4>
        <p>
          Use <a target="_newtab" rel="noopener noreferrer" href="https://github.com/askomics/flaskomics/issues">Github issues</a> to report a bug, get help or request for a new feature.
        </p>

        <h4>Acknowledgement</h4>
        <p>
          We acknowledge the <a target="_newtab" rel="noopener noreferrer" href="https://www.genouest.org/">GenOuest bioinformatics core facility</a> for providing the computing infrastructure.
        </p>
      </div>
    )
  }
}
