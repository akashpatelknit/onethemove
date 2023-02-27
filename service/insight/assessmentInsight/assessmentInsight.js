const { getAssessmentData } = require("../../axiosService");
const { getRecommendation } = require("./recommendation");
const { getImprovement } = require("./user_improvement");


const getAssessmentInsight = async () => {

    const user_assessment_data =await getAssessmentData();
    const user_improvement_allMonth = getImprovement(user_assessment_data); 
    const user_recommendation_latestmonth = await getRecommendation(user_improvement_allMonth);
    return user_recommendation_latestmonth
}


module.exports = {
    getAssessmentInsight
}