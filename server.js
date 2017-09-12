const express = require('express');
const app = express();
const server = require('http').createServer(app);
const http = require('http');


setInterval(function(){
		getMoistureLevel();
	}, 14400000 ); // 4 hours




  function getMoistureLevel(){
    const request = http.request('http://phant.labben.org:8090/output/ajEEoalKz4u6reoPAZAlfqQVAwKq.json', (response) => {
          response.setEncoding('utf8');
          let rawData = '';
          response.on('data', (chunk) => { rawData += chunk; });
          response.on('end', () => {
            console.log(JSON.parse(rawData)[0]);
            const moisture = JSON.parse(rawData)[0].moisture;

            validateMoistureLevel(moisture);
          });
      });
      request.end();
	}


function validateMoistureLevel(moisture){
  console.log('moisture: ', moisture);
  if(parseInt(moisture) <= 250){
    console.log(true);
    const request = http.request('http://maker.ifttt.com/trigger/vann_plante/with/key/fNfRwGpCUYsFefgVJMwoQmf0KtAlYdfn189mknG3JDd');
      request.end();
    } else {
      console.log(false, moisture);
    }
}
