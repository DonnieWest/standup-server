export const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    timezone: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}

export const down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('Users')
}
