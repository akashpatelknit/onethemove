
const customsort = (a, b) => {
  const monthA = a.assessmentMonth.month;
  const monthB = b.assessmentMonth.month;
  const yearA = a.assessmentMonth.year;
  const yearB = b.assessmentMonth.year;
  if (yearA < yearB) return 1;
  else if (yearA > yearB) return -1;
  if (monthA < monthB) return 1;
  else if (monthA > monthB) return -1;
  return 0;
};

const getGap = (current_month_data, previous_month_data) => {


  const current_month = current_month_data.month;
  const previous_month = previous_month_data.month;
  const current_year = current_month_data.year;
  const previous_year = previous_month_data.year;

  const year_diff = current_year - previous_year;

  var gap = current_month - previous_month;
  if (year_diff >= 1) {
    gap = 12 - previous_month + current_month + 12 * (year_diff - 1);
  }

  return gap
}

const getImprovement = function (user_assessment_data) {
  
  user_assessment_data.sort(customsort);
  const unique_user_name = Array.from(new Set(user_assessment_data.map((item) => item.name)));

  
  const improvementDataPerUserPerMonth = []
  for (let i = 0; i < unique_user_name.length; i++) { // calc improvement data for user 1 by 1
    const userName = unique_user_name[i]

    const userDataAllMonths = user_assessment_data.filter(data => data.name == userName)

    if (userDataAllMonths.length == 1) { // only 1 month's data present 
       improvementDataPerUserPerMonth.push({
        "name": userDataAllMonths[0].name,
        "code" : userDataAllMonths[0].code,
        "assessmentMonth": userDataAllMonths[0].assessmentMonth,
        "improvement":[],
        scorePerCategory: userDataAllMonths[0].scorePerCategory
      });

      continue;
    }

    
    for (let i = 0; i < userDataAllMonths.length - 1; i++) { // calc improvement data for 1 user
      const currentMonthData = userDataAllMonths[i];
      const previousMonthData = userDataAllMonths[i+1];


      const monthylImprovementPerMovement = []
      currentMonthData.performance.map(p => { // calc improvement per movement
        const prev_month_performance = previousMonthData.performance.filter(prev_p => prev_p.movement == p.movement)[0]
        const improvement = p.performance - prev_month_performance.performance
        monthylImprovementPerMovement.push({
          movement: p.movement,
          improvement: improvement
        })
      })

      improvementDataPerUserPerMonth.push({
        "name": userName,
        "code" : currentMonthData.code,
        "assessmentMonth": currentMonthData.assessmentMonth,
        "Gap": getGap(currentMonthData.assessmentMonth, previousMonthData.assessmentMonth),
        "improvement": monthylImprovementPerMovement,
        scorePerCategory: currentMonthData.scorePerCategory
      });
    }
      
  }


  return improvementDataPerUserPerMonth

}

module.exports = {
  getImprovement
}
