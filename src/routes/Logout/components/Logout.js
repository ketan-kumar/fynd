import React from 'react';
import { useHistory } from "react-router-dom";

import '../../../App.css';

export default function Logout(props) {
  let history = useHistory();
  // redirecting user to home screen if user trying to logout
  localStorage.setItem('user', JSON.stringify({}));
  history.push('/');

  return (
    <div></div>
  )
}
