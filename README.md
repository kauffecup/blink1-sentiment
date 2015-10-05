# Blink(1) Sentiment

A little project that hooks up a [blink(1)](https://blink1.thingm.com/) to
IBM Watson's [Tone Analyzer](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html)
in order to visualize the sentiment of Slack channels in real time.

Of course, this doesn't have to be hooked up to Slack, but can be applied to any
real time stream of text. It might be very interesting to see a visualization in
real time of a Twitter feed, or the comments on a blog, or maybe even the
captions on a TV. And hey, if you have access to a good Speech to Text service
([like this one from Watson](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html)),
that could get pretty interesting too.

To run the app:

```sh
babel-node app.js
```

## Requirements

  - An [IBM Bluemix](https://bluemix.net) account
  - [Tone Analyzer](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html)
    service bound to a Node.js runtime.
  - If running locally, must create a `VCAP_SERVICES.json` file that is
    identical to your environment variables in Bluemix.

## "Demo"

Whenever someone messages something angry, it turns red:

![angry](http://i.imgur.com/yrh35mW.jpg?2)

...or when they say something happy it turns yellow:

![happy](http://i.imgur.com/GyKmxpg.jpg?2)

...or when they say something sad it turns blue:

![sad](http://i.imgur.com/ocKp48j.jpg?2)

...and all shades in between.

## Theory

Watson gives us values of 0 - 1 for the following nine sub-categories from the
following three categories:

  - Emotional Tone: cheerfulness, negative, and anger
  - Writing Tone: analytical, confident, and tentative
  - Social Tone: openness, agreeableness, conscientiousness

"cheerfulness", "confident", "conscientiousness" contribute to yellow.
"negative", "tentative", and "analytical" contribute to blue. "anger"
contributes to red. "openness", and "agreeableness" contribute to green.

## License

This app is licensed under the MIT license. Full license text is
available in [LICENSE](https://github.com/kauffecup/blink1-sentiment/blob/master/LICENSE).

## Contact Me

All of my contact information can be found [here](http://www.jkaufman.io/about/)
