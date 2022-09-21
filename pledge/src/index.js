import React from 'react'
import ReactDOM from 'react-dom'
// import LandingPage from './components/Landing'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/main';
import { PledgeProvider } from './context/PledgeContext';


const rootElement = document.getElementById('root')

const App = (
  <PledgeProvider>
    <Main />
  </PledgeProvider>
)


ReactDOM.render(App, rootElement)