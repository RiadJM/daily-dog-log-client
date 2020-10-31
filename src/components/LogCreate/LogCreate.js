import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

class LogCreate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      log: {
        name: '',
        date: '',
        breakfast: '',
        dinner: '',
        exercise: ''
      },
      createdLogId: ''
    }
  }

  handleChange = (event) => {
    const userInput = event.target.value
    const eventKey = event.target.name
    const logCopy = Object.assign({}, this.state.log)
    logCopy[eventKey] = userInput
    this.setState({ log: logCopy })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const handleLog = this.state.log
    axios({
      url: `${apiUrl}/logs`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        log: handleLog
      }
    })
      .then((response) => {
        this.setState({ createdLogId: response.data.log._id })
        this.props.msgAlert({
          heading: 'Successfully Created',
          message: messages.createEventSuccess,
          variant: 'success'
        })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.createdLogId !== '') {
      return <Redirect to="/" />
    }

    return (
      <div className='create'>
        <h2>Log Create</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="name" type="text" placeholder="Name" value={this.state.log.name} onChange={this.handleChange}/>
          <input name="date" type="text" placeholder="Date" value={this.state.log.date} onChange={this.handleChange} />
          <input name="breakfast" type="text" placeholder="Breakfast" value={this.state.log.breakfast} onChange={this.handleChange} />
          <input name="dinner" type="text" placeholder="Dinner" value={this.state.log.dinner} onChange={this.handleChange}/>
          <input name="exercise" type="text" placeholder="Exercise" value={this.state.log.exercise} onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default LogCreate
