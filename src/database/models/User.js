import Sequelize from 'sequelize'

export default class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        location: DataTypes.STRING,
        bio: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        timezone: DataTypes.STRING,
      },
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    this.tokens = this.hasMany(models.Token)
  }
}
