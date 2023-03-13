const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");
const { getAttendanceData, getCollectionData } = require("../../axiosService");

const customsort = (a, b) => {
  const monthA = a.on.month;
  const monthB = b.on.month;
  const yearA = a.on.year;
  const yearB = b.on.year;
  if (yearA < yearB) return 1;
  else if (yearA > yearB) return -1;
  if (monthA < monthB) return 1;
  else if (monthA > monthB) return -1;
  return 0;
};


const getUserConsistency = async(memberCode) => {

  console.log("Calc consistency stats for", memberCode);

  const attendanceData = await getAll(DB_COLLECTION.ATTENDANCE, {
    member_code: memberCode
  })

  // console.log(attendanceData.length);
  const overallConsistency = getOverallConsistency(attendanceData, memberCode)

  // adit ka first month , current month , count 
  const monthlyConsistency = getMonthlyConsistency(attendanceData, memberCode)

  return {
    member: memberCode,
    consistency: {
      overall: overallConsistency,
      monthly: monthlyConsistency
    }
  }

}

const getOverallConsistency = (attendanceData,membercode)=>{

  const memberattendance= attendanceData.filter(a=>a.member_code==membercode);
  return memberattendance.length;

}

let getMonthlyConsistency = (attendanceData, membercode)=>{
  let memberAttendance=attendanceData.filter(a=>(a.member_code==membercode) );

  memberAttendance.sort(customsort);
  let count=0;
  let data=[];

  // calc first month, current month 
  // 10-22 , 3-23

  // monthly attendance array
  // 10-22, 11-22, 12-22, 1-23, 2-23, 3-23
  // filter -> length -> count 

  // sort data
  // 
  // month's non - exist => 0 

  for(let i=1;i<memberAttendance.length;i++){
      
      let curr_mon=memberAttendance[i].on.month;
      let prev_mon=memberAttendance[i-1].on.month;
      let curr_year=memberAttendance[i].on.year;
      let prev_year=memberAttendance[i-1].on.year;
      if(curr_mon-prev_mon==0 && curr_year-prev_year==0){
        count++;
      }
      else{
              let dummy={
              month:prev_mon,
              // year: ,
              count:count
              }
              data .push(dummy);
              count=0;
      }
  }
  return data;
}

module.exports={
    getUserConsistency
}