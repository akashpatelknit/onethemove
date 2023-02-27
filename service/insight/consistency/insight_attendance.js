
const { getAttendanceData } = require("../../axiosService");


const getWorkoutAttendance = async ()=> { 
  
  const attendance = await getAttendanceData();

  let attendance_day_title=[...new Set(attendance.map(item=> item.title))];
  attendance_day_title=attendance_day_title.filter(a=>a!="x")
  const user_attendendant_data=[]

  attendance_day_title.map((item)=>{
    
    let count_user=0;
    const user_code=[]
    attendance.map((item2)=>{
      if(item2.title==item){
        count_user++;
        user_code.push(item2.member_code);
      }
    })
  
    
    user_attendendant_data.push({
      title:item,
      count:count_user,
      codes:user_code
    })

  })

  return user_attendendant_data;

};


module.exports = {
  getWorkoutAttendance
}