const Sequelize = require("sequelize");
const JobsModel = require("./models/job.model");
const UsersModel = require("./models/user.model");
const ApproveSeekerModel = require("./models/approve_seeker.model");
const {
  DATABASE_NAME,
  USERNAME,
  PASSWORD,
  HOST,
  PORT,
  DIALECT,
} = require("./constants");
const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const Jobs = JobsModel(sequelize, Sequelize);
const Users = UsersModel(sequelize, Sequelize);
const ApproveSeeker = ApproveSeekerModel(sequelize, Sequelize);

// sequelize.sync({ force: false }).then(() => {
//   console.log(`Database & tables created here!`);
// });
module.exports = {
  Jobs,
  Users,
  ApproveSeeker,
};
