
const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");

const getAverageIntensity=async ()=>{
  const u_data=await getAll(DB_COLLECTION.INTENSITY); 


const unique_user_title = [...new Set(u_data.map(item=> item.title))];

const avgIntensity = [];
unique_user_title.map((item) => {
  const user_per_day = u_data.filter((data) => data.title == item);
  
  let total = 0;
  user_per_day.map(intensity => {
      
      if(intensity.intensity>=100) total += 100;
      else total += intensity.intensity;
  })

  const totalUser = user_per_day.length;

  // console.log(item,total,totalUser);

  avgIntensity.push({
    title: item,
    avg_intensity: Math.round(total / totalUser)
  })
  
})

return avgIntensity;

}


module.exports={
  getAverageIntensity
}



