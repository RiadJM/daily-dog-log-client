import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
    console.log('PROPS HERE', this.props)
    axios.get(apiUrl + '/logs/' + this.props.match.params.id)
      .then(response => {
        // troubleshoot step 1 - are we getting a response from the API?
        console.log(response)
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
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }
  render () {
    // troubleshoot step 2 - is the render for BookShow.js being called?
    console.log('TRYING TO SEE PROPS', this.props)
    console.log('rendering LogShow.js')
    let jsx
    // while the book is loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <div>
          <ul>
            <li>{this.state.log._id}</li>
            <li>{this.state.log.name}</li>
            <li>{this.state.log.date}</li>
            <li>{this.state.log.breakfast}</li>
            <li>{this.state.log.dinner}</li>
            <li>{this.state.log.exercise}</li>
          </ul>
          <button onClick={this.destroy}>Delete Log</button>
        </div>
      )
    }
    return (
      <div>
        <h2>Log Page</h2>
        {jsx}
      </div>
    )
  }
}
export default LogShow
