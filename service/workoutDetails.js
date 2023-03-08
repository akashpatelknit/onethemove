const { getAssessmentInsight } = require("../service/insight/assessmentInsight/assessmentInsight");
const { getWorkoutAttendance } = require("./insight/consistency/insight_attendance");



const getWorkoutDetails = async (batchName, title, memberName, theme) => {
    

    const memberRecommendation = await getAssessmentInsight(memberName); // call new func // calc only for 1 user // moveme
    // const assessmentInsight = await newFunc(memberName);
    const workoutAttendance = await getWorkoutAttendance(title); // 
    // intensity // memberName (calc last 5 intensity average)


    const workoutDetails = [{
        code: 'START',
        sectionMain: workoutAttendance.filter(a => a.title == title)[0].displayText

    }]
   
    memberRecommendation[0].recommendation.map(r => {
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