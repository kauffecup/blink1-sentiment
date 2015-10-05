import Blink1    from 'node-blink1';
import Promise   from 'bluebird';
import toneAsync from './toneAsync';
import Slack     from 'slack-client';
import fs        from 'fs';

// the token we'll use to authenticate w/ slack
const SLACK_TOKEN = process.env.SLACK_TOKEN || fs.readFileSync('./SLACK_TOKEN.txt', 'utf8');
// Automatically reconnect after an error response from Slack
const AUTO_RECCONECT = true;
// Automatically mark each message as read after it is processed
const AUTO_MARK = true;
// the time it takes to fade da blinker's colorz
const FADE_TIME = 1000;

// initialize da blinker
var blink = Promise.promisifyAll(new Blink1());
blink.off();
blink.setRGB(0, 0, 0);

// initialize slack
var slack = new Slack(SLACK_TOKEN, AUTO_RECCONECT, AUTO_MARK);
slack.on('open', () => {
  console.log(`Connected to ${slack.team.name} as @${slack.self.name}`);
});
slack.on('message', ({text}) => {
  console.log(`analyzing "${text}" ...`);
  textToColor(text);
});
slack.on('error', e => {
  console.error(e);
});
slack.login();

// go off to watson with some text and then set da blinkers color to it, nah mean?
function textToColor(text) {
  toneAsync(text).then(({children: [
    {children: [{normalized_score: cheerfulness}, {normalized_score: negative}, {normalized_score: anger}]},
    {children: [{normalized_score: analytical}, {normalized_score: confident}, {normalized_score: tentative}]},
    {children: [{normalized_score: openness}, {normalized_score: agreeableness}, {normalized_score: conscientiousness}]}
  ]}) => {
    // cheerfulness, negative, and anger are emotional tone
    // analytical, confident, and tentative are writing tone
    // openness, agreeableness, conscientiousness are social tone
    
    // cheerfulness, and confident contribute to yellow (...conscientiousness?)
    // negative, and tentative contribute to blue  (...analytical?)
    // anger contributes to red
    // openness, and agreeableness contribute to green (?)
    var y = (cheerfulness + confident + conscientiousness)/3 * 255;
    var r = Math.max(anger * 255, y);
    var g = Math.max((openness + agreeableness)/2 * 255, y);
    var b = (negative + tentative + analytical)/3 * 255;

    return blink.fadeToRGBAsync(FADE_TIME, r, g, b);
  }).catch(e => console.error(e));
}