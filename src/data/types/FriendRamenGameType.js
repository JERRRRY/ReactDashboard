import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const FriendRamenGameType = new GraphQLObjectType({
  name: 'FriendRamenGame',
  description: 'A record of ramen game scores and feedback',
  fields: () => ({
    score_id: { type: GraphQLID },
    score: { type: GraphQLInt },
    rating: { type: GraphQLString },
    anon_name: { type: GraphQLString },
    recommend: { type: GraphQLString },
  }),
});

export default FriendRamenGameType;
