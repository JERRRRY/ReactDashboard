import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import posts from './queries/posts';
import addPost from './mutations/posts';
import friendramengames from './queries/friendramengames';

const schemaConfig = {
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
      posts,
      friendramengames,
    },
  }),
};

// for demo purposes forbid mutations in production environment, if you want to enable mutation uncomment code below

 schemaConfig.mutation = new ObjectType({
   name: 'Mutation',
   fields: {
     addPost,
   },
 });



const schema = new Schema(schemaConfig);

export default schema;
