import Sequelize from 'sequelize'

export default class User extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        location: DataTypes.STRING,
        bio: DataTypes.STRING,
        username: DataTypes.STRING,
        timezone: DataTypes.STRING
      },
      {
        sequelize
      }
    )
  }

  static associate (models) {
    // associations can be defined here
  }
}
