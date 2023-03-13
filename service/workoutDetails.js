const { getAssessmentInsight } = require("../service/insight/assessmentInsight/assessmentInsight");
const { getWorkoutAttendance } = require("./insight/consistency/insight_attendance");




const getWorkoutDetails = async (batchName, title, memberName, theme) => {


    const assessmentRecommendation = await getAssessmentInsight(memberName); 
    const workoutAttendance = await getWorkoutAttendance(title, batchName); 

    // console.log(assessmentRecommendation[0].recommendation);

    const workoutDetails = [
        {
            code: 'START',
            sectionMain: workoutAttendance.filter(a => a.title == title)[0].displayText,
            sectionFooter: ""
        },
        ...assessmentRecommendation[0].recommendation
        .filter(r => r.wod_theme == theme)
        .map(r => ({
            code: r.section,
            sectionMain: "",
            sectionFooter: r.displayText
        }))
    ]

    return workoutDetails
}

module.exports = {
    getWorkoutDetails
}