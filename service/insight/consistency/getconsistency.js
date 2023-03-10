const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");
const { getAttendanceData, getCollectionData } = require("../../axiosService");


const getUserConsistency = async(memberCode) => {

  console.log("Calc consistency stats for", memberCode);



  const attendanceData = await getAll(DB_COLLECTION.ATTENDANCE, {
    member_code: memberCode
  })

  // console.log(attendanceData.length);
  const overallConsistency = getOverallConsistency(attendanceData, memberCode)

  // adit ka first month , current month , count 

  return {
    member: memberCode,
    consistency: {
      overall: overallConsistency,
      monthly: [
        // { month, count}
      ]
    }
  }

}

const getOverallConsistency = (attendanceData,membercode)=>{

  const memberattendance= attendanceData.filter(a=>a.member_code==membercode);
  return memberattendance.length;

}

let getmonthlyconsistency = async(attendanceData,membercode,month,year)=>{
  const monthly_member_attendance=attendanceData.filter(a=>(a.member_code==membercode && a.on.Month==month && a.on.Year==year) );
  return monthly_member_attendance.length;
}

module.exports={
    getUserConsistency
}