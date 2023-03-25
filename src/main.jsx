import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import axios from 'axios'
import { LOCAL_API_URL } from './utils/constants'

axios.defaults.baseURL = LOCAL_API_URL

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
