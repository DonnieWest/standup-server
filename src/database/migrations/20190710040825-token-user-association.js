export const up = (queryInterface, Sequelize) => {
  return queryInterface.addColumn('Tokens', 'UserId', {
    type: Sequelize.INTEGER,
    reference: {
      model: 'Users',
      key: 'id'
    }
  })
}

export const down = (queryInterface, Sequelize) => {
  return queryInterface.removeColumn('Tokens', 'UserId')
}
