const axios=require('axios')


const getMemberName = async () => {

  const res = await axios.get('https://on-the-move.onrender.com/api/v1/collection?name=members')
  
  return res.data
}

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

module.exports = {
    getAssessmentData,
    getBatchMembers,
    getAttendanceData,
    getMovementInfo,
    getMemberName
}