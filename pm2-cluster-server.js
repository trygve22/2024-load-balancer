const express = require('express');
const responseTime = require('response-time')

const app = express();

app.use(responseTime())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/:n", function (req, res) {
  let n = parseInt(req.params.n);
  let count = 0;

  if (n > 5000000000) n = 5000000000;

  for (let i = 0; i <= n; i++) {
    count += i;
  }

  res.send(`Final count is ${count} and check the response time in the header X-Response-Time`);
});

const server = app.listen(7000, () => {
    console.log('Listening on port %d', server.address().port)
})


// pm2
// to enable the cluster mode, just pass the -i option

// pm2 start pm2-cluster-server.js -i max

// max means that PM2 will auto detect the number of available CPUs and run as many processes as possible

// pm2 list
// pm2 show pm2-cluster-server


// curl requests
// link: https://curl.se/docs/manual.html
// Udregningen af tallet påvirker responstiden

// -i flag viser header information og -v flag viser mere information
// curl http://localhost:7000/api/500000
// curl -v http://localhost:7000/api/50000000
// curl -i http://localhost:7000/api/50000000


// loadtest
// npm install -g loadtest
// link: https://www.npmjs.com/package/loadtest

// loadtest http://localhost:7000/api/500 -n 10 -c 100