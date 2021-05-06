
import React, {useEffect, useMemo, useState} from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';

import Table from "./routes/Table/components/Table";
import Login from './routes/Login/components/Login';
import Logout from './routes/Logout/components/Logout';
import Movie from './routes/Movie/components/Movie';
import Constant from "./config/Constant";

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  const columns = useMemo(
    () => [
      {
        Header: "MOVIES",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Director",
            accessor: "director"
          }
        ]
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "IMDB_SCORE",
            accessor: "imdb_score"
          },
          {
            Header: "Genre(s)",
            accessor: "genre"
          },
          {
            Header: "99popularity",
            accessor: "popularity_99"
          },
          {
            Header: "",
            accessor: "delete",
            Cell: (row) => {
              const user = JSON.parse(localStorage.getItem('user')) || {};
              return(
                <button
                  disabled={(_.isEmpty(user)) ? true : false}
                  onClick={() => {
                    handleRowDelete(row);
                  }}
                  >
                  Delete
                </button>
              )
            }
          },
        ]
      }
    ],
    [data]
  );

  const handleRowDelete = (row) => {
    let movieToDelete = {};
    data.map((movie, index) => {
      if (movie.name == row.row.values.name && index === row.row.index) {
        movieToDelete = movie;
      }
    });
    deleteMovie(movieToDelete._id);
  }

  const updateMyData = (rowIndex, columnId, value) => {
    const rowToUpdate = [];
    data.map((row, index) => {
      if (index === rowIndex) {
        rowToUpdate.push({
          ...data[rowIndex],
          [columnId]: value,
        });
      }
    });
    setData(data);
    updateMovie(rowToUpdate[0]);
  }

  const fetchMovies = () => {
    axios({
      method: 'get',
      url: `${Constant.baseUrl}${Constant.port}/movie`,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(movies => {
      setData(movies.data.data);
    }).catch(err => {
      console.log('error while getting movies: ', err);
    });
  }

  const updateMovie = (rowToUpdate) => {
    const {
      _id,
      popularity_99,
      director,
      genre,
      imdb_score,
      name,
      admin
    } = rowToUpdate;
    axios({
      method: 'patch',
      url: `${Constant.baseUrl}${Constant.port}/movie`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      data: {
        id: _id,
        popularity_99,
        director,
        genre,
        imdb_score,
        name,
        admin
      }
    }).then(movies => {
      fetchMovies();
    }).catch(err => {
      console.log('error while getting movies: ', err);
    });
  }

  const deleteMovie = (movieId) => {
    axios({
      method: 'delete',
      url: `${Constant.baseUrl}${Constant.port}/movie/${movieId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }).then(movies => {
      fetchMovies();
    }).catch(err => {
      console.log('error while deleting movies: ', err);
    });
  }

  useEffect(() => {
    fetchMovies();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    setUser(user);
  }, []);

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/" exact>
            {(!_.isEmpty(data)) &&
              <div className="row">
                <Table
                  data={data}
                  columns={columns}
                  updateMyData={updateMyData}
                />
              </div>
            }
          </Route>
          <Route path="/login">
            <div className="row">
              <Login/>
            </div>
          </Route>
          <Route path="/logout">
            <div className="row">
              <Logout/>
            </div>
          </Route>
          <Route path="/movie">
            <div className="row">
              <Movie/>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
