module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const UserWechat = app.model.define('user_wechat', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    username: {
      type: STRING(63),
      field: 'username',
    },
    openId: {
      type: STRING(127),
      field: 'open_id',
    },
  });

  return UserWechat;
};
