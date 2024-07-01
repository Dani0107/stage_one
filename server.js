// const express = require('express');
// const app = express();
// const port = process.env.PORT || 2000;
//
// app.get('/api/hello', (req, res) => {
//   const name = req.query.name || 'Guest';
//   res.send({message: `Hello, ${name}!`});
// });
//
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 4000;

const IPINFO_API_KEY = process.env.IPINFO_API_KEY;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

app.get('/api/hello', async (req, res) => {
  const name = req.query.name || 'Guest';
  const userIp = (req.headers['x-forwarded-for'] || '').split(',').shift() || req.connection.remoteAddress;
  // const userIp = "102.88.84.80";
  // console.log(userIp);

  try {

    console.log(`User IP: ${userIp}`);
    const ipinfoResponse = await axios.get(`https://ipinfo.io/${userIp}?token=${IPINFO_API_KEY}`);
    const location = ipinfoResponse.data.city || 'Unknown Location';
    const loc = ipinfoResponse.data.loc.split(',');

    // console.log((`Location: ${location}, Coordinates: ${loc}`));

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${loc[0]}&lon=${loc[1]}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);
    const temperature = weatherResponse.data.main.temp;

    // console.log(`Temperature: ${temperature}`);

      const response {
        user_ip: userIp,
        location: location,
        greeting: `Hello, ${name}!, the temperature is ${temperature} degrees Celsius in ${location}`
      };

      res.json(response);
  } catch (error) {
    // console.error(`Error: $error.message`);
    // if (error.response) {
    //   console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    // }
    console.log(error);
    res.status(500).json({ error: 'An error occured while fetching data' });
    // console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
