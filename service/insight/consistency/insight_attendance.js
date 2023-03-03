
const { getAttendanceData } = require("../../axiosService");
const {getMemberName} =   require("../../axiosService");

const getWorkoutAttendance = async ()=> { 
  
  const attendance = await getAttendanceData();
  let user_data= await getMemberName();
     
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
     if(count_user==0){
      user_attendendant_data.push({
        title:item,
        count:count_user,
        codes:user_code,
        Displaytext:"you are the first one to perform this workout"
      })
     }
     else if(count_user==1){
        let user_name= user_data.filter(a=>a.code==user_code[0])
        user_attendendant_data.push({
          title:item,
          count:count_user,
          codes:user_code,
          Displaytext:`${user_name[0].name} have performed this workout`
        })
     }
    else if(count_user==2){
      let user_name1,user_name2;
      const code1=user_code[0];
      const code2=user_code[1];
      
        user_name1=user_data.filter(a=>a.code==code1)
      
      
        user_name2=user_data.filter(a=>a.code==code2)
      
     

      user_attendendant_data.push({
        title:item,
        count:count_user,
        codes:user_code,
        Displaytext:`${user_name1[0].name} and ${user_name2[0].name} other have performed this workout`
      })
      
    }
    else {
      
        let user_name1,user_name2;
      const code1=user_code[0];
      const code2=user_code[1];
      
        user_name1=user_data.filter(a=>a.code==code1)
      
      
        user_name2=user_data.filter(a=>a.code==code2)
      
      console.log('*',user_name1[0].name)
      console.log('**',user_name2[0].name)

      user_attendendant_data.push({
        title:item,
        count:count_user,
        codes:user_code,
        Displaytext:`${user_name1[0].name} , ${user_name2[0].name} and ${count_user-2} other have performed this workout`
      })
    }
   

  })
 
  return user_attendendant_data;

};


module.exports = {
  getWorkoutAttendance
}