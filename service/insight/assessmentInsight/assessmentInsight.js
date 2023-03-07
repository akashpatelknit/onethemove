const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");
const { getAssessmentData } = require("../../axiosService");
const { getRecommendation } = require("./recommendation");
const { getImprovement } = require("./user_improvement");

// calc all users
// new func -> 1 user
// call new func 1  by 1 for all users
const getAssessmentInsight = async (title) => {

    const user_assessment_data =await getAll(DB_COLLECTION.ASSESSMENT);
    const user_improvement_allMonth = getImprovement(user_assessment_data); 
    const improvement_one_user=user_improvement_allMonth.filter(r=>r.name==title)
    const user_recommendation_latestmonth = await getRecommendation(improvement_one_user);
    return user_recommendation_latestmonth
}


module.exports = {
    getAssessmentInsight
}