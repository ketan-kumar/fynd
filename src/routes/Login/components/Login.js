import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import _ from 'lodash';

import Constant from '../../../config/Constant';
import '../../../App.css';
import Header from '../../../component/Header';

export default function Login(props) {
  const [email, setEmail] = useState('');
  let history = useHistory();
  let user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    // redirecting user to home screen if user login status is true
    if (!_.isEmpty(user) && (user.loginStatus)) {
      history.push('/');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: `${Constant.baseUrl}${Constant.port}/user/login`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: email
      }
    }).then(response => {
      const {
        email,
        name,
        token,
        role
      } = response.data.data;
      localStorage.setItem('user', JSON.stringify({
        email,
        name,
        role,
        token,
        loginStatus: true
      }));
      history.push('/');
    }).catch(err => {
      console.log('error while getting movies: ', err);
    });
  }

  return (
    <div className="center container">
      <Header/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Email
            <input
              className="form-control"
              name="email"
              type="email"
              value={email}
              required
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </label>
        </div>
        <div className="m-5">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  )
}
