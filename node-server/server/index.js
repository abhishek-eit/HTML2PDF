const express = require("express");
const { Op } = require("sequelize");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Jobs, Users, ApproveSeeker } = require("./sequelize");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/getData", async (req, res) => {
  let job_id = +req.body.id;
  try {
    let jobTableData = await Jobs.findOne({
      where: { job_id },
      attributes: ["job_id", "location", "job_title", "start_date", "end_date"],
    });
    let seekerTableData = await ApproveSeeker.findAll({
      where: { job_id },
      attributes: [
        "id",
        "job_id",
        "provider_id",
        "seeker_id",
        "approval_hour",
        "approval_min",
        "approval_payment",
      ],
    });
    let job_provider_name;
    let secondTableData = [];
    if (seekerTableData) {
      job_provider_name = await Users.findOne({
        where: { user_id: seekerTableData[0].provider_id },
        attributes: ["first_name", "last_name"],
      });

      jobTableData.provider_name =
        job_provider_name.first_name + " " + job_provider_name.lastName;

      for (const data of seekerTableData) {
        let userTableData = await Users.findOne({
          where: { user_id: +data.seeker_id },
          attributes: ["first_name", "last_name"],
        });
        secondTableData.push({
          ...data.dataValues,
          user_name:
            userTableData.dataValues.first_name +
            " " +
            userTableData.dataValues.last_name,
        });

        console.log(secondTableData);
      }
    }
    console.log("outside");

    res.json({
      jobTableData: {
        ...jobTableData.dataValues,
        provider_name:
          job_provider_name.first_name + " " + job_provider_name.last_name,
      },
      secondTableData,
    });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Something Went Wrong", err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
