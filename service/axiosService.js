const axios = require('axios')

const getAssessmentData = async () => {

  const res = await axios.get('https://on-the-move.onrender.com/api/v1/collection?name=monthlyAssessment')

  return res.data
}
const getBatchMembers = async () => {

  const res = await axios.get('https://on-the-move.onrender.com/api/v1/client/?batch=SHRED')
  return res.data
}

const getAttendanceData = async () => {
  const res = await axios.get(
    'https://on-the-move.onrender.com/api/v1/collection?name=workoutPerformance'
  );
  return res.data;
};

// finding movement information
const getMovementInfo = async () => {
  const res = await axios.get(
    'https://on-the-move.onrender.com/api/v1/assessment/test'
  );
  return res.data;
};

const getIntensity = async () => {
 const res=await axios.get('https://on-the-move.onrender.com/api/v1/collection?name=intensity'
 );
 return res.data;
};

module.exports = {
  getAssessmentData,
  getBatchMembers,
  getAttendanceData,
  getMovementInfo,
  getIntensity
}