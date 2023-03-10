const { getAll } = require('../../../db/db');
const { DB_COLLECTION } = require('../../../db/dbDetails');

const getRecom = async () => {
  const workoutSummary = await getAll(DB_COLLECTION.WORKOUTSUMMARY);

  const users_with_data = workoutSummary.filter((r) => r.data != undefined);

  const unique_user_name = [...new Set(users_with_data.map((r) => r.name))];

  const workoutMovementSummary=[]

  unique_user_name.map((r) => {

  const user_all_day_data = users_with_data.filter((name) => name.name == r);

  const movement_array = [];
  user_all_day_data.map((data) => {
        
        for (let key in data.data) {
          if (
            key.includes('rpe') ||
            key.includes('reps') ||
            key.includes('weight')
          ) {
           
            var obj={}
            obj[key]=data.data[key]
            movement_array.push(
            obj
            )
          }
        }
  });
  
  // const key=[]
  // movement_array.map(key_name=>{
  // key.push(Object.keys(key_name)[0])
  // })
  // let unique_key = [...new Set(key)]

     workoutMovementSummary.push({
      name:r,
      movements:movement_array
     })
  });

  return workoutMovementSummary;
}

module.exports = {
  getRecom,
};
