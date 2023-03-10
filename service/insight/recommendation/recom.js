const { getAll } = require('../../../db/db');
const { DB_COLLECTION } = require('../../../db/dbDetails');

const getRecom = async () => {
  const workoutSummary = await getAll(DB_COLLECTION.WORKOUTSUMMARY);

  const workoutData = workoutSummary.filter((r) => r.data != undefined);

  const unique_user_name = [...new Set(workoutData.map((r) => r.name))];

  const workoutMovementSummary=[]

  unique_user_name.map((name) => {

  const user_all_day_data = workoutData.filter((wd) => wd.name == name);

  
  const perMovementHistory = []
    // { code: , history: [{}]}
  user_all_day_data.map((data) => { // 1 day data
        
    const movement_array = [];
    for (let key in data.data) {
      if (
        (
          key.includes('-rpe') ||
          key.includes('-reps') ||
          key.includes('-weight') 
        ) 
        &&
        !(
          key.includes("STR") ||
          key.includes("strength") 
        )
      ) {
        
        var obj={}
        obj[key]=data.data[key]
        movement_array.push(
        obj
        )
      }
    }
    console.log(movement_array);

    // unique movements find
    // const mvmtCode = mvmtData.split("-")[0]
    // PU, P, CF, CP

    // perMovementHistory PU -> history push {pu-reps pu -rpe} 
    // const isHistoryPresent = perMovementHistory.filter(mh => mh.code == mvmtCode).length

  //   if (isHistoryPresent) {
  //     perMovementHistory.filter(mh => mh.code == mvmtCode)[0].history
  //   } // else history


  });
  


  

  workoutMovementSummary.push({
    name:name,
    movementHistory: perMovementHistory
    })
  });

  return workoutMovementSummary;
}

module.exports = {
  getRecom,
};
