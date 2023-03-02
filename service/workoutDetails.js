const { getAssessmentInsight } = require("../service/insight/assessmentInsight/assessmentInsight");
const { getWorkoutAttendance } = require("./insight/consistency/insight_attendance");



const getWorkoutDetails = async (batchName, title, memberName, theme) => {
    

    const assessmentInsight = await getAssessmentInsight();
    const workoutAttendance = await getWorkoutAttendance();

    console.log()

    const workoutDetails = [{
        code: 'START',
        sectionMain: workoutAttendance.filter(a => a.title == title)[0].displayText

    }]
    const memberAssessmentInsight = assessmentInsight.filter(i => 
        i.name == memberName)[0]
    const memberRecommendation = memberAssessmentInsight.recommendation.filter(r => 
        r.wod_theme == theme) 
    memberRecommendation.map(r => {
        workoutDetails.push({
            code: r.section,
            sectionFooter: r.displayText
        })
    })
    

    return workoutDetails


}

module.exports = {
    getWorkoutDetails
}