const SHREDASSESSMENTMOVEMENTS = {
    push_ups: "Push Ups",
    strict_press: "Strict Press",
    plank: "Plank",
    bentover_row: "Bentover Row",
    deadlift: "Deadlift",
    high_plank: "High Plank",
    squats: "Squats",
    wall_sit: "Wall Sit",
    burpees: "Burpees",
    run: "Run",
    sit_ups: "Sit Ups",
    leg_raises: "Leg Raises"
}
const ASSESSMENTCATEGORIES = {
    push: "Push",
    pull: "Pull",
    squat: "Squat",
    core: "Core",
    endurance: "Endurance"
}
const movements = [
    {
        movement: SHREDASSESSMENTMOVEMENTS.push_ups,
        category: ASSESSMENTCATEGORIES.push,
        min: 0,
        max: 30
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.strict_press,
        category: ASSESSMENTCATEGORIES.push,
        min: 0,
        max: 25,
        weight_reference: 10
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.plank,
        category: ASSESSMENTCATEGORIES.push,
        min: 0,
        max: 180
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.bentover_row,
        category: ASSESSMENTCATEGORIES.pull,

        min: 0,
        max: 30,
        weight_reference: 10
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.deadlift,
        category: ASSESSMENTCATEGORIES.pull,

        min: 0,
        max: 30,
        weight_reference: 10

    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.high_plank,
        category: ASSESSMENTCATEGORIES.pull,

        min: 0,
        max: 210
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.squats,
        category: ASSESSMENTCATEGORIES.squat,


        min: 0,
        max: 45
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.wall_sit,
        category: ASSESSMENTCATEGORIES.squat,


        min: 0,
        max: 120
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.burpees,
        category: ASSESSMENTCATEGORIES.endurance,

        min: 0,
        max: 25
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.run,
        category: ASSESSMENTCATEGORIES.endurance,

        min: 300,
        max: 720,
        method: "inverse"
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.sit_ups,
        category: ASSESSMENTCATEGORIES.core,

        min: 0,
        max: 40
    },
    {
        movement: SHREDASSESSMENTMOVEMENTS.leg_raises,
        category: ASSESSMENTCATEGORIES.core,
        min: 0,
        max: 35
    },
]
// finding weakest category
const getWeakestCategory=function(scorePerCategory){
 let score = Infinity, weakestCategory;
        for (let i = 0; i < scorePerCategory.length; i++) {
            if (scorePerCategory[i].score < score) {
                score = scorePerCategory[i].score
                weakestCategory = scorePerCategory[i].category
            }
        }
        return weakestCategory

}
// finding recommendation for weakest category
const getRecommendationBasedOnWeakestCategory = function (weakest_score_category) {
    var arr = []
    movements.map((item) => {
        if (weakest_score_category == item.category) {
            arr.push(item.movement);
        }
    })
    return arr;
}

const getRecommendation = function (allUserData) {
    const recommendationAllUsers = [];

    allUserData.map((userImprovementData) => {


        const  recommendation=[]  // 2. filter
       const userDataWithNegativeImprovement=userImprovementData.improvement.filter(negative_improvements=> negative_improvements.improvement<0)
       userDataWithNegativeImprovement.map(user_improvement_at_each_movement=>{
       recommendation.push({
                    movement: user_improvement_at_each_movement.movement,
                    info: {
                        reason: "decline_in_performance",
                        improvement: user_improvement_at_each_movement.improvement

                    }
                })
       
       })
        const weakestCategoryRecommendedMovements = getRecommendationBasedOnWeakestCategory(getWeakestCategory(userImprovementData.scorePerCategory));
        weakestCategoryRecommendedMovements.map((x) => {
            recommendation.push({
                movement: x,
                info: {
                    reason: "weakest_category"
                }

            })
        })


        recommendationAllUsers.push({
            name: userImprovementData.name,
            code: userImprovementData.code,
            assessmentMonth: userImprovementData.assessmentMonth,
            Gap: userImprovementData.Gap,
            improvement: recommendation,
        });

    })
    // console.log(recommendationAllUsers)
    return recommendationAllUsers
}
module.exports = {
    getRecommendation
}
