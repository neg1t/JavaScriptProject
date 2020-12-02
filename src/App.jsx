import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";

import './css/index.css'
import DetailPhoto from './Components/DetailPhoto'
import Home from './Components/Home'


let App = ({ modal }) => {
  return (
    <>
      <Router>
        <Route exact path='/' component={Home} />
      </Router>

      {modal === true ? <DetailPhoto />  : null}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.reducer.modal
  }
}

export default App = connect(mapStateToProps)(App)