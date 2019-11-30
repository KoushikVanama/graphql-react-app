import React from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from './../queries/queries';
import {flowRight as compose} from 'lodash';

class AddBook extends React.Component{
  state = {
    name: '',
    genre: '',
    authorId: ''
  };
  displayAuthors(){
    var data = this.props.getAuthorsQuery;
    if(data.loading){
      return <option disabled>Loading authors</option>
    }else {
      return data.authors.map((author) => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }
  submitForm(e){
    const { name, genre, authorId } = this.state;
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }
  render(){
    console.log(this.props);
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => this.setState({ genre: e.target.value })}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
