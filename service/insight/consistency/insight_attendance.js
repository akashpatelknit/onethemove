
const { getAttendanceData, getCollectionData } = require("../../axiosService");


const getWorkoutAttendance = async ()=> { 
  
  const attendanceData = await getAttendanceData();
  const memberData = await getCollectionData('members')

  let attendance_day_title=[...new Set(attendanceData.map(item=> item.title))];
  attendance_day_title=attendance_day_title.filter(a=>a!="x")
  const user_attendendant_data=[]

  attendance_day_title.map((day)=>{
    
    let count_user=0;
    const user_code=[]
    attendanceData.map((a)=>{
      if(a.title==day){
        count_user++;
        user_code.push(a.member_code);
      }
    })

    // console.log(day);
    // console.log(count_user);
    // console.log(user_code);

    let displayText = 'You are the first one to do this workout'
    if (count_user == 1) {
      displayText = `${memberData.filter(m => m.code == user_code[0])[0].name} has completed this workout`
    } else if (count_user == 2) {
      displayText = `${memberData.filter(m => m.code == user_code[0])[0].name} and ${memberData.filter(m => m.code == user_code[1])[0].name} have completed this workout`
    } else if (count_user > 2) {
      displayText = `${memberData.filter(m => m.code == user_code[0])[0].name}, ${memberData.filter(m => m.code == user_code[1])[0].name} and ${count_user - 2} others have completed this workout`
    }
  
    
    user_attendendant_data.push({
      title:day,
      count:count_user,
      codes:user_code,
      displayText: displayText

    })

  })

  return user_attendendant_data;

};


module.exports = {
  getWorkoutAttendance
}