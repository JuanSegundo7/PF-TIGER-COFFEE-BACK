const server = require('./src/app.js');
require('dotenv').config();
const { PORT } = process.env;

  server.listen(PORT, () => {
    console.log(`Listening at Port: ${PORT}`); // eslint-disable-line no-console
  });


  // 1
  