import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from './../queries/queries';
import BookDetails from './BookDetails';

class BookList extends React.Component{
  state = {
    selected: null
  };
  displayBooks(){
    var { data } = this.props;
    if(data.loading){
      return(<div>Loading books</div>);
    } else {
      return data.books.map((book) => {
        return(
          <li key={book.id} onClick={(e) => {this.setState({ selected: book.id })}}>{ book.name }</li>
        );
      });
    }
  }
  render(){
    console.log(this.props);
    const { selected } = this.state;
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
