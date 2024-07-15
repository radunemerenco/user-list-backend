import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
