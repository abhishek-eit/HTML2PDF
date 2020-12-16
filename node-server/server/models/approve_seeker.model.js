module.exports = (sequelize, type) => {
  return sequelize.define(
    "tab_approve_seeker",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      job_id: type.STRING,
      provider_id: type.STRING,
      seeker_id: type.STRING,
      approval_hour: type.STRING,
      approval_min: type.STRING,
      approval_payment: type.STRING,
    },
    { freezeTableName: true }
  );
};
