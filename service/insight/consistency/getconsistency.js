const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");
const { getAttendanceData, getCollectionData } = require("../../axiosService");



let getOverallConsistency = async(attendanceData,membercode)=>{
   
    const memberattendance= attendanceData.filter(a=>a.member_code==membercode);
    return memberattendance.length;
}
let getmonthlyconsistency = async(attendanceData,membercode,month,year)=>{
  const monthly_member_attendance=attendanceData.filter(a=>(a.member_code==membercode && a.on.Month==month && a.on.Year==year) );
  return monthly_member_attendance.length;
}
module.exports={
    getOverallConsistency,
    getmonthlyconsistency
}