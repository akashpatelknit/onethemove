const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");

const MAX_INTENSITY = 150

const getIntensityRecommendation = async (memberName, title, batchName) => {
  const intensityData = await getAll(DB_COLLECTION.INTENSITY);
  const memberData = await getAll(DB_COLLECTION.MEMBER);

  const userCode=memberData.filter((member) => member.name===memberName)[0].code;
  
  const userIntensityData=intensityData.filter((data)=> data.code===userCode)
  // console.log(u_info);
 
  var chunk = userIntensityData.slice(0,5);
  // console.log(chunk);

  // const intensity = chunk.map(item=> item.intensity);
  const total = chunk.reduce((sum, item) => {
    console.log(item.intensity, sum);
    if(item.intensity>=MAX_INTENSITY) return sum+MAX_INTENSITY;
    else return sum+item.intensity;
  }, 0);

  console.log(total)

  return {
    name: memberName,
    code: userCode,
    avgIntensity: Math.round(total/chunk.length),
    recommendation: ""
  }

}
module.exports = {
  getIntensityRecommendation
}