'use strict';

import {
  Model
} from 'sequelize';
const crypto = require('crypto');

interface IUserAttributes {
  id: string;
  name: string;
  balance: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUserAttributes> implements IUserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    balance!: number;

    static associate(models: any) {
      // define association here
      User.hasMany(models.Bet, { foreignKey: 'userId', as: 'bets' })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: crypto.randomUUID(),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};