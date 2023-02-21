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
const recommendation = [
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

// finding recommendation for weakest category
const recommended_movements = function (weakest_score_category) {
    var arr = []
    recommendation.map((item) => {
        if (weakest_score_category == item.category) {
            arr.push(item.movement);
        }
    })
    return arr;
}

const recommendation_fxn = function (user_improvement_latestmonth) {
    const recommendation_pre_movement = [];

    user_improvement_latestmonth.map((item) => {
        var score = Infinity, mov;
        for (let i = 0; i < item.scorePerCategory.length; i++) {
            if (item.scorePerCategory[i].score < score) {
                score = item.scorePerCategory[i].score

                mov = item.scorePerCategory[i].category

            }
        }
        const arr1 = [];
        item.improvement.map((item1) => {

            if (item1.improvement < 0) {
                arr1.push({
                    movement: item1.movement,
                    info: {
                        reason: "decline_in_performance",
                        improvement: item1.improvement

                    }
                })
            }
        })
        const a = recommended_movements(mov);
        a.map((x) => {
            arr1.push({
                movement: x,
                info: {
                    reason: "weakest_category"
                }

            })
        })


        if (arr1.length >= 1) {
            const rec = [];
            recommendation_pre_movement.push({
                name: item.name,
                code: item.code,
                assessmentMonth: item.assessmentMonth,
                Gap: item.Gap,
                improvement: arr1,
            });
        }
    })
    console.log(recommendation_pre_movement)
    return recommendation_pre_movement
}
module.exports = recommendation_fxn
