const graphql = require('graphql');

const _ = require('lodash');

const {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList
} = graphql;

/*
 * Responsibilites of schema:
 * 1. Define types
 * 2. define relationships btw types
 * 3. Root queries
 **/

 const books = [
   { id: '1' ,genre: 'Action', name: "Name1", authorId: '1'},
   { id: '2' ,genre: 'Horror', name: "Name2", authorId: '3'},
   { id: '3' ,genre: 'Sci-fi', name: "Name3", authorId: '2'},
   { id: '4' ,genre: 'Fantasy', name: "Name4", authorId: '3'}
 ];

 const authors = [
   { id: '1' ,age: 22, name: "Auth1"},
   { id: '2' ,age: 33, name: "Auth2"},
   { id: '3' ,age: 66, name: "Auth3"}
 ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        console.log(parent);
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, {authorId: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      book: {
        type: BookType,
        args: { id: { type: GraphQLID }},
        resolve(parent, args){
          // code to get data from db/other source
          return _.find(books, {id: args.id});
        }
      },
      author: {
        type: AuthorType,
        args: { id: {type: GraphQLID }},
        resolve(parent, args){
          return _.find(authors, {id: args.id});
        }
      },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
          return books
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
          return authors
        }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
