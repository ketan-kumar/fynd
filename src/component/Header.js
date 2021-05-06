import React from 'react';
import { NavLink} from "react-router-dom";
import _ from 'lodash';
import { useHistory } from "react-router-dom";

export default function Header(props) {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  return (
    <div className="row text-start" style={{marginTop: "30px", marginLeft: "205px", marginBottom: "30px", padding: "5px"}}>
      {(user.loginStatus) &&
        <NavLink className="col" to="/logout" activeClassName="selected">Logout</NavLink>
      }
      {(_.isEmpty(user) && history.location.pathname !== '/login') &&
        <NavLink className="col" to="/login" activeClassName="selected">Login</NavLink>
      }
      {((user.role === 'admin') && history.location.pathname !== '/movie') &&
        <NavLink className="col" to="/movie" activeClassName="selected">movie</NavLink>
      }
      {((_.isEmpty(user) && history.location.pathname !== '/') || history.location.pathname === '/movie') &&
        <NavLink className="col" to="/" activeClassName="selected">Home</NavLink>
      }
    </div>
  )
}
