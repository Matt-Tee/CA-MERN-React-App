import axios from 'axios';
const jwt = require('jsonwebtoken')
require('dotenv').config()

let dataAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    common: {
      Authorization: jwt.sign({
      authed: true
    }, 'superSecretKey'),
      ContentType: 'application/json'
    }
  }
});

export default dataAPI
