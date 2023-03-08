const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");

const getAverage_5_Intensity = async (memberName) => {
  const u_data = await getAll(DB_COLLECTION.INTENSITY);
  const u_name = await getAll(DB_COLLECTION.MEMBER);

  const userName=memberName

  const u_code = u_name.reduce((a, item) => {
    if(item.name===userName) a=item.code;
    return a;
  });
 
  const u_info = u_data.reduce((a, item) => {
    if(item.code===u_code) a.push(item);
    return a;
  },[]);


  // console.log(u_info);
 
  var chunk = u_info.slice(0,5);
  // console.log(chunk);

  let total = 0;
  chunk.map(intensity => {
    if (intensity.intensity >= 100) total += 100;
    else total += intensity.intensity;
  })

  // console.log(chunk,total,chunk.length)

  const avgIntensity = [];

  avgIntensity.push({
    name: userName,
    code: u_code,
    avg_intensity: Math.round(total/chunk.length)
    
  })


  return avgIntensity;

}


module.exports = {
  getAverage_5_Intensity
}





