import { toJson } from 'unsplash-js'
import { unsplash } from '../api'
import { withRouter } from 'react-router-dom'
import Photos from './Photos'
import Header from './Header'

const Home = () => {

  if (localStorage.getItem('token')) {
    unsplash.auth.setBearerToken(localStorage.getItem('token'))
  } else {

    const code = window.location.search.split('code=')[1]
    if (code) {
      unsplash.auth.userAuthentication(code)
      .then(toJson)
      .then(json => {
        localStorage.setItem('token', json.access_token);
        unsplash.auth.setBearerToken(json.access_token);
      })
    }
  }

  return (
    <>
      <Header />
      <Photos />
    </>
  )
}

export default withRouter(Home)