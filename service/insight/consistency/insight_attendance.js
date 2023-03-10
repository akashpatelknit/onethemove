
const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");
const { getAttendanceData, getCollectionData } = require("../../axiosService");
// const { ans}= require("./insight_attendance_unique_title");

let getWorkoutAttendance = async (title) => { 
  const attendanceData =  await getAll(DB_COLLECTION.ATTENDANCE);
  
    const memberData = await getAll(DB_COLLECTION.MEMBER);
    const attendance_day_title=attendanceData.filter(a=>a.title==title);
   
    let count_user=attendance_day_title.length;
   
    // console.log(attendance_day_title);
    let user_code = attendance_day_title.map((a) => a.member_code)
    // console.log(user_code);

    let displayText = 'You are the first one to do this workout'
    if (count_user == 1) {
      displayText = `${memberData.filter(m => m.code == user_code[0])[0].name} has completed this workout`
    } else if (count_user == 2) {
      displayText = `${memberData.filter(m => m.code == user_code[0])[0].name} and ${memberData.filter(m => m.code == user_code[1])[0].name} have completed this workout`
    } else if (count_user > 2) {
      displayText = `${memberData.filter(m => m.code == user_code[0])[0].name}, ${memberData.filter(m => m.code == user_code[1])[0].name} and ${count_user - 2} others have completed this workout`

    }
    const user_attendendant_data=[];
    user_attendendant_data.push({
        title:title,
        count:count_user,
        codes:user_code,
        displayText:displayText

    })
    return user_attendendant_data
  
 }


module.exports = {
  getWorkoutAttendance
}