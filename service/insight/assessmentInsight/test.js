
const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");

const getAverage_5_Intensity = async () => {
  const u_data = await getAll(DB_COLLECTION.INTENSITY);
  const u_name = await getAll(DB_COLLECTION.MEMBER);

  const u_code = [...new Set(u_data.map(item => item.code))];

  // console.log(u_code);

  const avgIntensity = [];
  u_code.map((item) => {
    const user_data = u_data.filter((data) => data.code == item);
    const user_name=u_name.filter((data) => data.code == item);

    // console.log(item,user_name);

    let total = 0;
    let averageIntensityUser = 0;
    const user_data_size = user_data.length;
    if (user_data_size < 5) {
      user_data.map(intensity => {
        if (intensity.intensity >= 100) total += 100;
        else total += intensity.intensity;
      })
      averageIntensityUser = total / user_data_size
    }
    else {
      user_data.filter((intensity, idx) => idx < 5).map(intensity => {

        if (intensity.intensity >= 100) total += 100;
        else total += intensity.intensity;
      })
      averageIntensityUser = total / 5;
    }

    // console.log(item,total,user_data_size)

    let m_name;
    user_name.map(name=>{
      if(name.code==item){
        m_name=name.name
      }
    })
    
    avgIntensity.push({
      name: m_name,
      code: item,
      avg_intensity: Math.round(averageIntensityUser)
      
    })
    // console.log(item,total / user_data_size,)


  })

  return avgIntensity;

}


module.exports = {
  getAverage_5_Intensity
}



