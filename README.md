# Requirements
- An openai account
- tokens to use ChatGPT

## Get an api key
- go to openai.com and signin/signup
- click your profile and click "view API keys"
- click the button that says create new secret key
- create a .env file
- copy and paste the key into the .env file

### .env file example
````
API_KEY=example
````

## Enter the parameters for your slide at the top of script.js
````
const topic = "how to improve coding skills";
const extra = "talk about Reactjs specifically";
let slideNum = 6;
let bulletMin = 3;
let bulletMax = 5;
let temperature = 0.2;
let max_tokens = 500;
````

## Running the script
- Go to the terminal and type "npm run start"
- A folder called presentations will appear with the powerpoint file you created

## Prompt can be edited in chatGpt.js
````
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
````