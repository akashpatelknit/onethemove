const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");

const getAverage_5_Intensity = async (memberName) => {
  const u_data = await getAll(DB_COLLECTION.INTENSITY);
  const u_name = await getAll(DB_COLLECTION.MEMBER);

  const u_code=u_name.filter((data) => data.name===memberName);
  
  const u_info=u_data.filter((data)=> data.code===u_code[0].code)
  // console.log(u_info);
 
  var chunk = u_info.slice(0,5);
  const intensity = chunk.map(item=> item.intensity);

  const total = intensity.reduce((sum, item) => {
    if(item>=100) return sum+100;
    else return sum+item;
  });

  // console.log(total)

  const avgIntensity = [];

  avgIntensity.push({
    name: memberName,
    code: u_code[0].code,
    avg_intensity: Math.round(total/intensity.length)
  })

  return avgIntensity;

}
module.exports = {
  getAverage_5_Intensity
}