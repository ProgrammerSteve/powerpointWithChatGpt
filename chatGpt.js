const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
async function callGpt(
  topic,
  slideNum = 6,
  bulletMin = 3,
  bulletMax = 5,
  extra = ""
) {
  const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  let prompt = `
  create a power point script on ${topic},response should be in a JSON format similar to the following:
  {
      "title": "powerPointTitle",
      "slides": [
          {
              "title": "titleName",
              "content": [
                  "string","string","string",...
              ]
          },
  ...}
Must be ${slideNum} slides long and each content array should have ${bulletMin}-${bulletMax} bullet points for the slide. ${extra}
  `;
  let powerpoint = "";
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.2,
      max_tokens: 500,
    });
    let resp = completion.data.choices[0].text;
    powerpoint = JSON.parse(resp.replace("\n", ""));
  } catch (err) {
    throw new Error(err);
  }
  return powerpoint;
}
module.exports = { callGpt };
