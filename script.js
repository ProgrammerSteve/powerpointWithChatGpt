const pptxgen = require("pptxgenjs");
const path = require("path");
const { callGpt } = require("./chatGpt.js");

const topic = "how to improve coding skills";
const extra = "talk about Reactjs specifically";
let slideNum = 6;
let bulletMin = 3;
let bulletMax = 5;
let temperature = 0.2;
let max_tokens = 500;

async function generatePowerPoint(
  topic,
  slideNum,
  bulletMin,
  bulletMax,
  extra
) {
  let powerpoint = await callGpt(
    topic,
    slideNum,
    bulletMin,
    bulletMax,
    extra,
    temperature,
    max_tokens
  );
  let pres = new pptxgen();
  let titleSlideRef = pres.addSlide();
  titleSlideRef.addText(powerpoint.title, {
    h: "100%",
    w: "100%",
    align: "center",
    bold: true,
    fontSize: 50,
  });

  powerpoint.slides.forEach((slide) => {
    let slideRef = pres.addSlide();
    let bulletCount = 0;
    slideRef.addText(slide.title, {
      y: 0.5,
      h: 0.5,
      w: "100%",
      align: "center",
      bold: true,
      fontSize: 24,
    });
    slide.content.forEach((bullet) => {
      slideRef.addText(bullet, {
        x: 1.5,
        y: 1.5 + 0.85 * bulletCount,
        h: 0.25,
        bullet: true,
      });
      bulletCount++;
    });
  });
  try {
    await pres.writeFile({
      fileName: path.join(
        __dirname,
        "presentations",
        `${powerpoint.title}.pptx`
      ),
    });
    console.log("complete");
  } catch (err) {
    console.log("error:", err);
  }
}
generatePowerPoint(
  topic,
  slideNum,
  bulletMin,
  bulletMax,
  extra,
  temperature,
  max_tokens
);
