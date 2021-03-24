import React, { Component } from "react";
import "./App.css";
import MovieRow from "./MovieRow.js";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.performSearch = this.performSearch.bind(this);
    this.createItemList = this.createItemList.bind(this);
  }

  componentDidMount() {
    this.performSearch("welcome");
  }
  performSearch(searchTm) {
    console.log("perform search using DB");
    const url =
      "https://api.themoviedb.org/3/search/movie?api_key=3b069033bd170e40583aa5c109d227c1&query=" +
      searchTm;
    $.ajax({
      url: url,
      success: (searchResult) => {
        console.log("successfully done..!!");
        const results = searchResult.results;
        console.log(results);

        results.forEach((movie) => {
          if (movie.poster_path)
            movie.poster_path =
              "https://images.tmdb.org/t/p/w185" + movie.poster_path;
        });

        this.setState({ rows: results });
      },
      error: (xhr, status, err) => {
        console.error("failed to fetch data");
      },
    });
  }

  createItemList() {
    let rows = {};
    let counter = 1;
    this.state.rows.forEach((item, idx) => {
      rows[counter] = rows[counter] ? [...rows[counter]] : [];
      if (idx % 4 === 0 && idx !== 0) {
        counter++;
        rows[counter] = rows[counter] ? [...rows[counter]] : [];
        rows[counter].push(item);
      } else {
        rows[counter].push(item);
      }
    });
    return rows;
  }

  searchChangeHandler(event) {
    if (event.target.value) this.performSearch(event.target.value);
  }

  render() {
    let rows = this.createItemList();
    return (
      <div className="container container-fluid">
        <table className="bar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="logo.png" />
              </td>
              <td>
                <h1>MovieDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div>
          <input
            className="search"
            onChange={this.searchChangeHandler.bind(this)}
            placeholder="Search movie"
          ></input>
          <br />
          {/* {this.state.rows.map((movie, index) => (
            <div key={index}>
              {movie % 3 == 1 ? <span>Yes</span> : <span>No</span>}
              <MovieRow key={movie.id} movie={movie} />
            </div>
          ))} */}
          {Object.keys(rows).map((row) => {
            return (
              <div className="row" key={row}>
                {rows[row].map((movie) => (
                  <div className="col-lg-3" key={movie.id}>
                    <MovieRow movie={movie} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
