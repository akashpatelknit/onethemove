const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");

const MAX_INTENSITY = 150

const getIntensityRecommendation = async (memberName, title, batchName) => {
  console.log("Fetchhing Intensity recommendation", memberName, title);
  const intensityData = await getAll(DB_COLLECTION.INTENSITY);
  const memberData = await getAll(DB_COLLECTION.MEMBER);
  const workoutData = await getAll(DB_COLLECTION.WORKOUT);

  const userCode = memberData.filter((member) => member.name === memberName)[0].code;

  const userIntensityData = intensityData.filter((data) => data.code === userCode)
  // console.log(u_info);

  var chunk = userIntensityData.slice(0, 5);
  // console.log(chunk);

  // const intensity = chunk.map(item=> item.intensity);
  const total = chunk.reduce((sum, item) => {
    // console.log(item.intensity, sum);
    if (item.intensity >= MAX_INTENSITY) return sum + MAX_INTENSITY;
    else return sum + item.intensity;
  }, 0);
  const averageIntensity = Math.round(total / chunk.length);


  
  const userProgram = workoutData.filter((Day) => Day.day === title)[0].program
  const metconData = userProgram.filter(s => s.code == 'METCON')[0]

  // console.log(metconData[0].name)
  let diplayText
  const workFormat = metconData.content.format;
  if (workFormat.name === 'AMRAP') {
    // ideal case for intensity
    console.log(workFormat.coachNotes[0].levels[0].content, "in", workFormat.displayName, "is", workFormat.coachNotes[0].levels[0].levelName)

    // this will come directly from DB
    var idealRound = workFormat.coachNotes[0].levels[0].content[3]
    console.log("IdealRound",idealRound)
    var reqRound = idealRound
    var reqPercent = 100
    while (averageIntensity < reqPercent) {
      reqPercent = (--reqRound) * 100 / idealRound
    }
    reqRound++;
    reqPercent = Math.round(reqRound * 100 / idealRound)
    // console.log(reqRound,reqPercent)
    diplayText = `You have been working at ${averageIntensity}% intensity.Let's try going for ${reqPercent}%. Perform ${reqRound} rounds in ${workFormat.displayName}.`
  }



  return {
    name: memberName,
    code: userCode,
    avgIntensity: averageIntensity,
    recommendation: diplayText

  }

}
module.exports = {
  getIntensityRecommendation
}