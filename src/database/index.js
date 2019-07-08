import Sequelize from 'sequelize'
import Models from './models'
import config from './config'

export default async function init () {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      logging: process.env.LOGGING ? console.log : false,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  )

  // Run `.associate` if it exists,
  // ie create relationships in the ORM
  Object.values(Models)
    .map(model => model.init(sequelize, Sequelize))
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(Models))

  await sequelize.authenticate()
  await sequelize.sync()

  return sequelize
}
