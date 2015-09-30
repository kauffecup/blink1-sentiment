import Blink1     from 'node-blink1';
import Promise    from 'bluebird';
// import microphone from 'microphone';
import watson     from 'watson-developer-cloud';
import toneAsync  from './toneAsync';

// the time it takes to fade da blinker's colorz
const FADE_TIME = 1000;

// initialize da blinker
var blink = Promise.promisifyAll(new Blink1());
blink.off();
blink.setRGB(0, 0, 0);

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