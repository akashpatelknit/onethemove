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

  return {
    member: memberCode,
    consistency: {
      overall: overallConsistency,
      monthly: data
    }
  }

}

const getOverallConsistency = (attendanceData,membercode)=>{

  const memberattendance= attendanceData.filter(a=>a.member_code==membercode);
  return memberattendance.length;

}

let getmonthlyconsistency = async(attendanceData,membercode)=>{
  let monthly_member_attendance=attendanceData.filter(a=>(a.member_code==membercode) );
       monthly_member_attendance.sort(customsort);
       let count=0;
       let data=[];
       for(let i=1;i<monthly_member_attendance.length;i++){
           
            let curr_mon=monthly_member_attendance[i].on.month;
            let prev_mon=monthly_member_attendance[i-1].on.month;
            let curr_year=monthly_member_attendance[i].on.year;
            let prev_year=monthly_member_attendance[i-1].on.year;
            if(curr_mon-prev_mon==0 && curr_year-prev_year==0){
              count++;
            }
            else{
                   let dummy={
                    month:prev_mon,
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