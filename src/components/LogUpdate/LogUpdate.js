import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class LogUpdate extends React.Component {
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
      isLoaded: false,
      isUpdated: false
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
  handleChange = (event) => {
    // get value the user typed in
    const userInput = event.target.value
    // get the name of the input they typed in
    const logKey = event.target.name // "title" or "author"
    // make a copy of the state (copy this javascript object)
    const logCopy = Object.assign({}, this.state.log)
    // updating the key in our copy with what the user typed
    logCopy[logKey] = userInput
    // updating the state with our new copy
    this.setState({ log: logCopy })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const newLog = this.state.log
    // make POST request to API /games route with book data
    axios({
      url: `${apiUrl}/logs/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        log: newLog
      }
    })
      .then((response) => this.setState({ isUpdated: true }))
      .catch(console.error)
  }
  render () {
    if (this.state.isUpdated !== false) {
      return <Redirect to="/" />
    }
    return (
      <div className='log-update'>
        <h2>Log Update</h2>
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
export default LogUpdate
