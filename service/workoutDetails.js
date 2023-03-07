const { getAssessmentInsight } = require("../service/insight/assessmentInsight/assessmentInsight");
const { getWorkoutAttendance } = require("./insight/consistency/insight_attendance");
const { getAverage_5_Intensity } = require("../service/insight/assessmentInsight/test");



const getWorkoutDetails = async (batchName, title, memberName, theme) => {


    const assessmentInsight = await getAssessmentInsight(); // call new func // calc only for 1 user // moveme
    // const assessmentInsight = await newFunc(memberName);
    const workoutAttendance = await getWorkoutAttendance(title); // 


    // intensity // memberName (calc last 5 intensity average)
    const intensity5_user = await getAverage_5_Intensity(memberName);

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