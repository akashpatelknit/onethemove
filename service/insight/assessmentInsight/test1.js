
const { getIntensity } = require("../../axiosService");

const getAverageIntensity=async ()=>{
  const u_data=await getIntensity();
// console.log(u_data)

const unique_user_title = [...new Set(u_data.map(item=> item.title))];
// console.log(unique_user_title);
const avgIntensity = []
unique_user_title.map((item) => {
  const user_per_day = u_data.filter((data) => data.title == item);
  // console.log(item);
  let total = 0;
  user_per_day.map(intensity => {
    total += intensity.intensity;
  })
  const totalUser = user_per_day.length;
  // console.log(total/totalUser);
  console.log(item);
  avgIntensity.push({
    title: item,
    avg_intensity: total / totalUser
  })

})
return avgIntensity;

}


module.exports={
  getAverageIntensity
}



