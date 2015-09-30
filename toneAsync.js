import Promise from 'bluebird';
import watson  from 'watson-developer-cloud';

// get these from either the environment variable or a json file
var vcapServices = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : require('./VCAP_SERVICES.json');

// build the credentials object from vcap services
var toneCredentials = vcapServices.tone_analyzer[0].credentials;
toneCredentials.version = 'v2';

// initialize the tone analyzer
var toneAnalyzer = watson.tone_analyzer(toneCredentials);

// our export function. takes in text and returns a promise that resolves with
// the response from watson.
export default text => new Promise((resolve, reject) => {
  toneAnalyzer.tone({text: text}, (e, res, request) => {
    if (e) {
      reject(e);
    } else {
      resolve(res);
    }
  })
});