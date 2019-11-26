const graphql = require('graphql');

const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

/*
 * Responsibilites of schema:
 * 1. Define types
 * 2. define relationships btw types
 * 3. Root queries
 **/

 const books = [
   { id: "1" ,genre: 'Action', name: "Name1"},
   { id: "2" ,genre: 'Horror', name: "Name2"},
   { id: "3" ,genre: 'Sci-fi', name: "Name3"}
 ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      book: {
        type: BookType,
        args: { id: { type: GraphQLString }},
        resolve(parent, args){
          // code to get data from db/other source
          return _.find(books, {id: args.id})
        }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
