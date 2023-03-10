const { getAll } = require('../../../db/db');
const { DB_COLLECTION } = require('../../../db/dbDetails');

const getRecom = async () => {
  const workoutSummary = await getAll(DB_COLLECTION.WORKOUTSUMMARY);

  const workoutData = workoutSummary.filter((r) => r.data != undefined);

  const unique_user_name = [...new Set(workoutData.map((r) => r.name))];

  const workoutMovementSummary = [];

  unique_user_name.map((name) => {
    
    const user_all_day_data = workoutData.filter((wd) => wd.name == name);

    const perMovementHistory = [];
    // { code: , history: [{}]}
    user_all_day_data.map((data) => {
      // 1 day data

      const movement_array = [];
      for (let key in data.data) {
        if (
          (key.includes('-rpe') ||
            key.includes('-reps') ||
            key.includes('-weight')) &&
          !(key.includes('STR') || key.includes('strength'))
        ) {
          var obj = {};
          obj[key] = data.data[key];
          movement_array.push(obj);
        }
      }
      // console.log(movement_array);
  
      for (let i = 0; i < movement_array.length - 1; i += 2) {
        let a = movement_array[i];
        let b = movement_array[i + 1];

        let keyOfA = Object.keys(a)[0];
        let keyOfB = Object.keys(b)[0];
        let mvmtCode = keyOfA.split('-')[0];

        const isHistoryPresent = perMovementHistory.filter(
          (mh) => mh.code == mvmtCode
        ).length;
        // console.log(isHistoryPresent);

        let history = [];
        var obj = {};
        obj[keyOfA] = a[keyOfA];
        obj[keyOfB] = b[keyOfB];
        history.push(obj);
        // console.log(history)
        if (isHistoryPresent) {
          let index = perMovementHistory.findIndex((x) => x.code == mvmtCode);
          perMovementHistory[index].history.push(obj);
          
          //  console.log()
        } else {
          //  console.log();
          perMovementHistory.push({
            code: mvmtCode,
            history: history,
          });
        }
      }
    });

    workoutMovementSummary.push({
      name: name,
      movementHistory: perMovementHistory,
    });
  });

  return workoutMovementSummary;
};

module.exports = {
  getRecom,
};
