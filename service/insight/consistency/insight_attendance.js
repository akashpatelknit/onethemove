
const { getAll } = require("../../../db/db");
const { DB_COLLECTION } = require("../../../db/dbDetails");
const { getAttendanceData, getCollectionData } = require("../../axiosService");
const { ans}= require("./insight_attendance_unique_title");

let getWorkoutAttendance = async ()=> { 
  getWorkoutAttendance= await  ans('January Day 10')
return getWorkoutAttendance;

 };


module.exports = {
  getWorkoutAttendance
}