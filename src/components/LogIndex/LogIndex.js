import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class LogIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      isLoaded: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/logs')
      .then(response => {
        this.setState({
          isLoaded: true,
          logs: response.data.logs
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.logs.length === 0) {
      jsx = <p>No Dog Logs currently available, please add one.</p>
    } else {
      jsx = (
        <ul>
          {this.state.logs.map(log => {
            return <li key={log._id}><Link to={`/logs/${log._id}`}>{log.name}</Link></li>
          })}
        </ul>
      )
    }
    return (
      <div className='logs-page'>
        <h2>Dog Logs</h2>
        {jsx}
      </div>
    )
  }
}
export default LogIndex
