import { GraphQLList as List}  from 'graphql';
import { resolver } from 'graphql-sequelize';
import FriendRamenGameType from '../types/FriendRamenGameType';
import FriendRamenGame from '../models/FriendRamenGame';

const friendramengames = {
  type: new List(FriendRamenGameType),
  resolve: resolver(FriendRamenGame),
};

export default friendramengames;
