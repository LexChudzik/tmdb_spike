import React, { Component } from 'react';
import { connect } from 'react-redux';

const emptyState = {
    search: ''
}

class Search extends Component {

    state = emptyState


    // log input search
    handleChange = (event) => {
        console.log('handleChange input', event.target.value);
        this.setState({
            search: event.target.value
        })
    }

    // dispatch to save movie
    handleSave = (movie) => {
        this.props.dispatch( { type: 'SEND_SAVE', payload: movie } )
    }

    // send state to index to search 
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch( { type: 'SEARCH_MOVIES', payload: this.state  } )
        this.clearState();
    }

    clearState = () => {
        this.setState(emptyState);
      }

  // Renders to the DOM
  render() {
    return (
      <div>
        <h1>Search for Movie</h1>
        <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.search} placeholder="search" />
            <button>Search</button>
        </form>
        <section>
            <ul>
                {this.props.reduxState.searchResults.map((movie) =>
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="test"/>
                    <button onClick={()=> {this.handleSave(movie)}}>Save</button>
                </li>
                )}
            </ul>
        </section>
      </div>
    );
  }
}

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

export default connect(mapReduxStateToProps)(Search);