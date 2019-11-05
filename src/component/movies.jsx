import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "./common/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    // sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres: genres,
      selectGenre: genres[0]
    });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    // console.log(movies);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {// genre.name
    this.setState({ sortColumn }); //: { path: path, order: "asc" }
  };

  getPagedData = () => {
    const {
      movies,
      pageSize,
      currentPage,
      selectGenre,
      sortColumn
    } = this.state;

    const filtered =
      selectGenre && selectGenre._id
        ? movies.filter(m => m.genre._id === selectGenre._id)
        : movies;

    const sorted = sortColumn ?_.orderBy(filtered, [sortColumn.path], [sortColumn.order])  : filtered;

    const allMovies = paginate(currentPage, pageSize, sorted);

    return { data: allMovies, totalCount: filtered.length }
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectGenre,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { data, totalCount } = this.getPagedData();
    

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>

          <div className="col">
            <p>There are {totalCount} movies in the database.</p>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
            />
             
            {/* // use pagination */}
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
