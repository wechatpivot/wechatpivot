module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    username: STRING(127),
    password: STRING(255),
  });

  return User;
};
