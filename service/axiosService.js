const axios = require('axios')


// finding movement information
const getMovementInfo = async () => {
  const res = await axios.get(
    'https://on-the-move.onrender.com/api/v1/assessment/test'
  );
  return res.data;
};





module.exports = {
  getMovementInfo
}