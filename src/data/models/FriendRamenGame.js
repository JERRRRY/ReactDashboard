import DataType from 'sequelize';
import Model from '../sequelize'; // this connects to your DB

const FriendRamenGame = Model.define(
  'friend_ramen_game',
  {
    score_id: {
      type: DataType.TEXT,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataType.TEXT,
      allowNull: true,
    },
    anon_name: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    recommend: {
      type: DataType.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'friend_ramen_game',
    timestamps: false, // adds createdAt and updatedAt
  }
);

export default FriendRamenGame;
