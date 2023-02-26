const axios = require('axios');
    
const getMovementInfo = async () => {

    // console.log("fetching data");
    const res = await axios.get('https://on-the-move.onrender.com/api/v1/assessment/test')
    // console.log(res.data);
    return res.data
}

// finding weakest category
const getWeakestCategory = function (scorePerCategory) {
  let score = Infinity,
    weakestCategory;
  for (let i = 0; i < scorePerCategory.length; i++) {
    if (scorePerCategory[i].score < score) {
        score = scorePerCategory[i].score;
        weakestCategory = scorePerCategory[i].category;
    }
  }
  return weakestCategory;
};
// finding recommendation for weakest category
const getRecommendationBasedOnWeakestCategory = function (weakest_score_category, movementInfo) {
  var arr = [];
  movementInfo.map((item) => {
    if (weakest_score_category == item.category) {
      arr.push(item.movement);
    }
  });
  return arr;
};

const getRecommendation = async (allUserData) => {


    const movementInfo = await getMovementInfo()
    // console.log("data fetched");
    // return
    const recommendationAllUsers = [];

    let previousMonthUser = '@';
    allUserData.map((userImprovementData) => {
        const recommendation = [];
        if (previousMonthUser != userImprovementData.name) { // assumption allUserData -> sorted using name, time(desc)
        previousMonthUser = userImprovementData.name;

        // filter
        const movementsWithNegativeImprovement = userImprovementData.improvement.filter(
            (improvementPerMovement) => improvementPerMovement.improvement < 0
            );

        // console.log(movementsWithNegativeImprovement);
        
        

        
            
        movementsWithNegativeImprovement.map((movement) => { 
            const movementDetails = movementInfo.filter(m => m.movement == movement.movement)[0]
            recommendation.push({
                movement: movement.movement,
                info: {
                    reason: 'decline_in_performance',
                    improvement: movement.improvement,
                },
                section: movementDetails.section,
                wod_theme: movementDetails.instruction.wod_theme
            });
            }
        );

        const weakestCategoryMovementNames = getRecommendationBasedOnWeakestCategory(
            getWeakestCategory(userImprovementData.scorePerCategory),
            movementInfo
            );

        // console.log(weakestCategoryMovementNames);

        
        weakestCategoryMovementNames.map((n) => {
            const movementDetails = movementInfo.filter(m => m.movement == n)[0]
            recommendation.push({
                movement: n,
                info: {
                    reason: 'weakest_category',
                },
                section: movementDetails.section,
                wod_theme: movementDetails.instruction.wod_theme
            });
        });

        recommendationAllUsers.push({
            name: userImprovementData.name,
            code: userImprovementData.code,
            assessmentMonth: userImprovementData.assessmentMonth,
            Gap: userImprovementData.Gap,
            recommendation: recommendation,
        });
        }
    });
    
    return recommendationAllUsers;
};

module.exports = {
  getRecommendation,
};
