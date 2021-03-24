import React from "react";

class MovieRow extends React.Component {
  viewdetail() {
    //console.log(this.props.movie.title)
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
    window.location.href = url;
  }
  render() {
    return (
      <div
        className="card"
        style={{ width: 18 + "rem" }}
        key={this.props.movie.id}
      >
        <img
          src={this.props.movie.poster_path}
          className="card-img-top"
          alt="Poster"
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.movie.title}</h5>
          <p className="card-text article-height">
            {this.props.movie.overview}
          </p>
          <button
            href="#"
            className="btn btn-primary"
            onClick={this.viewdetail.bind(this)}
          >
            View Full Article
          </button>
        </div>
      </div>
    );
  }
}

export default MovieRow;
