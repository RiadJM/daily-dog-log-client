import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

class LogShow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      log: {},
      isLoaded: false,
      deleted: false
    }
  }

  componentDidMount () {
    axios.get(apiUrl + '/logs/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          isLoaded: true,
          log: response.data.log
        })
      })
      .catch(console.error)
  }

  destroy = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/logs/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.props.msgAlert({
          heading: 'Successfully Deleted',
          message: messages.deleteEventSuccess,
          variant: 'success'
        })
        this.props.history.push('/')
      })

      .catch(console.error)
  }

  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else {
      let deleteButton = ''
      if (this.state.log.owner === this.props.user._id) {
        deleteButton = <button onClick={this.destroy}>Delete Log</button>
      }
      jsx = (
        <div>
          <ul>
            <li>Name : {this.state.log.name}</li>
            <li>Date: {this.state.log.date}</li>
            <li>Breakfast: {this.state.log.breakfast}</li>
            <li>Dinner: {this.state.log.dinner}</li>
            <li>Exercise: {this.state.log.exercise}</li>
          </ul>
          {deleteButton}
        </div>
      )
    }
    return (
      <div className='log-page'>
        <h2>Log Page</h2>
        {jsx}
      </div>
    )
  }
}
export default withRouter(LogShow)
