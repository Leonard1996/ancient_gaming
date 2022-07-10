'use strict';
import {
  Model
} from 'sequelize';

interface IBetAttributes {
  id: number;
  betAmount: number;
  chance: number;
  payout: number;
  win: boolean;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Bet extends Model<IBetAttributes> implements IBetAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    betAmount!: number;
    chance!: number;
    payout!: number;
    win!: boolean;

    static associate(models: any) {
      // define association here
      Bet.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Bet.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    betAmount: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
    chance: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
    },
    payout: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
    {
      sequelize,
      modelName: 'Bet',
    });
  return Bet;
};