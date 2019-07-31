import Sequelize from 'sequelize'
import uuid from 'uuid/v4'

export default class Token extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        token: {
          type: DataTypes.STRING,
          defaultValue: uuid,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    this.user = this.belongsTo(models.User)
  }
}
