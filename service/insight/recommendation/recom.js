const { getAll } = require('../../../db/db');
const { DB_COLLECTION } = require('../../../db/dbDetails');
const { DETAILS, WEIGHT } = require('./rpes');

const getRecom = async () => {
  const workoutSummary = await getAll(DB_COLLECTION.WORKOUTSUMMARY);
  const user_with_data = workoutSummary.filter((r) => r.data != undefined);
  const user_name = [...new Set(user_with_data.map((r) => r.name))];
  const final = [];
  user_with_data.map((r) => {

 


  });
  console.log(user_name);

  return user_with_data;
};

module.exports = {
  getRecom,
};
