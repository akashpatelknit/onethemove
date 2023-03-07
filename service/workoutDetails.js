const {
  getAssessmentInsight,
} = require('../service/insight/assessmentInsight/assessmentInsight');
const {
  getWorkoutAttendance,
} = require('./insight/consistency/insight_attendance');

const getWorkoutDetails = async (batchName, title, memberName, theme) => {
  const memberRecommendation = await getAssessmentInsight(memberName);
  const workoutAttendance = await getWorkoutAttendance();
  const b = workoutAttendance.filter((a) => a.title == title);

  const workoutDetails = [
    {
      code: 'START',
      sectionMain: workoutAttendance.filter((a) => a.title == title)[0]
        .displayText,
    },
  ];

  memberRecommendation[0].recommendation.map((r) => {
    workoutDetails.push({
      code: r.section,
      sectionFooter: r.displayText,
    });
  });

  return workoutDetails
};

module.exports = {
  getWorkoutDetails,
};
