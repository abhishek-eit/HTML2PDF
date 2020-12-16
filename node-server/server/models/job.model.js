module.exports = (sequelize, type) => {
  return sequelize.define("tab_jobs", {
    job_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    location: type.STRING,
    job_title: type.STRING,
    start_date: type.STRING,
    end_date: type.STRING,
  });
};
