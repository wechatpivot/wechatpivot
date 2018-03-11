module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const UserWechat = app.model.define('user_wechat', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    userId: {
      type: INTEGER,
      field: 'user_id',
    },
    openId: {
      type: STRING(127),
      field: 'open_id',
    },
  });

  return UserWechat;
};
