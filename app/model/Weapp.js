module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Weapp = app.model.define('weapp', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    appId: STRING,
    ghId: STRING,
  });

  Weapp.listAppByGhId = async function (ghId) {
    const result = await app.model.query([
      'SELECT `app_name` AS `app`',
      'FROM `xref_weapp_app` LEFT JOIN `weapp` ON `xref_weapp_app`.`app_id` = `weapp`.`app_id`',
      'WHERE `weapp`.`gh_id` = :ghId',
    ].join(' '), {
      replacements: { ghId },
      type: 'SELECT',
    });
    return result.map(r => r.app);
  };

  return Weapp;
};
