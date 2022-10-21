import { createCanvas, registerFont, Image, loadImage } from 'canvas';
import schedule_json from '../../public/test.json';

export default async function handler(req, res) {
  const data = await openSchedule();
  const canvas = await makeAllImg();

  res.status(200).send(canvas.toBuffer('image/jpeg', { quality: 1 }));
}

// stage image 640x320
// icon image 128x128
async function openSchedule() {

  // must call brefore create Canvas!!!!
  registerFont('./public/Koruri-20210720/Koruri-Regular.ttf', { family: 'kokuri_r' });
  registerFont('./public/Koruri-20210720/Koruri-Extrabold.ttf', { family: 'kokuri_exb' });

  const one_schedule_h = 180;
  const all_schedule_h = one_schedule_h * schedule_json.bankara_open.length;
  const canvas = createCanvas(1080, all_schedule_h);
  const oneMatch = createCanvas(1080, 180);
  const ctx = canvas.getContext('2d');
  const ctx_om = oneMatch.getContext('2d');
  let imgbuff = new Image();

  let schedule_index = 0;
  for (const match of schedule_json.bankara_open) {
    let date;
    let start_tm;

    ctx_om.fillStyle = schedule_index % 2 === 0 ? "rgb(169,169,169)" : "rgb(220,220,220)";
    ctx_om.fillRect(0, 0, 1080, 180);

    // set start time
    date = new Date(Date.parse(match.start_time));
    start_tm = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + "~";

    ctx_om.font = '60px Impact';
    ctx_om.fillStyle = "rgb(0, 0, 0)";
    ctx_om.fillText(start_tm, 10, 60);

    // stage draw
    let index = 0;
    for (const stage of match.stages) {
      const w = 640;
      const h = 320;
      const rule_w = 70;
      const stage_cvs = createCanvas(w, h);
      const stg_ctx = stage_cvs.getContext('2d');

      imgbuff = await loadImage('./public/asset/stage_vss/stage_' + ('0' + stage.id).slice(-2) + '.png');
      stg_ctx.drawImage(imgbuff, 0, 0);

      stg_ctx.fillStyle = "rgba(50, 50, 50, 0.5)";
      stg_ctx.fillRect(0, h - 55, w, 55);
      stg_ctx.fillRect(0, 0, w, 80);

      stg_ctx.font = '50px "kokuri_exb';
      stg_ctx.fillStyle = "rgb(255, 255, 255)";
      stg_ctx.fillText(stage.name, 10, 310, 640);
      stg_ctx.fillText("オープン", 10, 60);

      imgbuff = await loadImage(`./public/asset/rule/${getRuleAsset(match.rule.key)}`);
      stg_ctx.drawImage(imgbuff, w - rule_w - 5, 5, 70, 70);

      ctx_om.drawImage(clipCarveSq(stage_cvs), 440 + 320 * index, 5, 320, 160);
      index++;
    }

    // draw output canvas
    ctx.drawImage(oneMatch, 0, 180 * schedule_index + 80);
    schedule_index++;
  }


  //  return canvas.toBuffer('image/jpeg', { quality: 1 });

}

/**
 * 
 * @returns {Canvas}
 */
const OpenStageImg = async () => {
  registerFont('./public/Koruri-20210720/Koruri-Regular.ttf', { family: 'kokuri_r' });
  registerFont('./public/Koruri-20210720/Koruri-Extrabold.ttf', { family: 'kokuri_exb' });

  const one_schedule_h = 160;
  const all_schedule_h = one_schedule_h * schedule_json.bankara_open.length;
  const canvas = createCanvas(640, all_schedule_h);
  const canvas_om = createCanvas(640, 160);
  const ctx = canvas.getContext('2d');
  const ctx_om = canvas_om.getContext('2d');
  let schedule_index = 0;
  let imgbuff = new Image();

  for (const match of schedule_json.bankara_open) {
    let date;
    let start_tm;
    let index = 0;

    ctx_om.fillStyle = schedule_index % 2 === 0 ? "rgb(169,169,169)" : "rgb(220,220,220)";
    ctx_om.fillRect(0, 0, 640 + 5, 160);

    // stage draw
    for (const stage of match.stages) {
      const w = 640;
      const h = 320;
      const rule_w = 70;
      const stage_cvs = createCanvas(w, h);
      const stg_ctx = stage_cvs.getContext('2d');

      imgbuff = await loadImage('./public/asset/stage_vss/stage_' + ('0' + stage.id).slice(-2) + '.png');
      stg_ctx.drawImage(imgbuff, 0, 0);

      stg_ctx.fillStyle = "rgba(50, 50, 50, 0.5)";
      stg_ctx.fillRect(0, h - 55, w, 55);
      stg_ctx.fillRect(0, 0, w, 80);

      stg_ctx.font = '50px "kokuri_exb';
      stg_ctx.fillStyle = "rgb(255, 255, 255)";
      stg_ctx.fillText(stage.name, 10, 310, 640);
      stg_ctx.fillText("オープン", 10, 60);

      imgbuff = await loadImage(`./public/asset/rule/${getRuleAsset(match.rule.key)}`);
      stg_ctx.drawImage(imgbuff, w - rule_w - 5, 5, 70, 70);

      ctx_om.drawImage(clipCarveSq(stage_cvs), 315 * index + 7.5, 5, 310, 150);
      index++;
    }

    // draw output canvas
    ctx.drawImage(canvas_om, 0, 160 * schedule_index);
    schedule_index++;
  }
  return canvas;
}

const challengeStageImg = async () => {
  registerFont('./public/Koruri-20210720/Koruri-Regular.ttf', { family: 'kokuri_r' });
  registerFont('./public/Koruri-20210720/Koruri-Extrabold.ttf', { family: 'kokuri_exb' });

  const one_schedule_h = 160;
  const all_schedule_h = one_schedule_h * schedule_json.bankara_challenge.length;
  const canvas = createCanvas(640, all_schedule_h);
  const canvas_om = createCanvas(640, 160);
  const ctx = canvas.getContext('2d');
  const ctx_om = canvas_om.getContext('2d');
  let schedule_index = 0;
  let imgbuff = new Image();

  for (const match of schedule_json.bankara_challenge) {
    let date;
    let start_tm;
    let index = 0;

    ctx_om.fillStyle = schedule_index % 2 === 0 ? "rgb(169,169,169)" : "rgb(220,220,220)";
    ctx_om.fillRect(0, 0, 640 + 5, 160);

    // stage draw
    for (const stage of match.stages) {
      const w = 640;
      const h = 320;
      const rule_w = 70;
      const stage_cvs = createCanvas(w, h);
      const stg_ctx = stage_cvs.getContext('2d');

      imgbuff = await loadImage('./public/asset/stage_vss/stage_' + ('0' + stage.id).slice(-2) + '.png');
      stg_ctx.drawImage(imgbuff, 0, 0);

      stg_ctx.fillStyle = "rgba(50, 50, 50, 0.5)";
      stg_ctx.fillRect(0, h - 55, w, 55);
      stg_ctx.fillRect(0, 0, w, 80);

      stg_ctx.font = '50px "kokuri_exb';
      stg_ctx.fillStyle = "rgb(255, 255, 255)";
      stg_ctx.fillText(stage.name, 10, 310, 640);
      stg_ctx.fillText("チャレンジ", 10, 60);

      imgbuff = await loadImage(`./public/asset/rule/${getRuleAsset(match.rule.key)}`);
      stg_ctx.drawImage(imgbuff, w - rule_w - 5, 5, 70, 70);

      ctx_om.drawImage(clipCarveSq(stage_cvs), 315 * index + 7.5, 5, 310, 150);
      index++;
    }

    // draw output canvas
    ctx.drawImage(canvas_om, 0, 160 * schedule_index);
    schedule_index++;
  }
  return canvas;
}

const scheduleTimeImg = async () => {

  // must call brefore create Canvas!!!!
  registerFont('./public/Koruri-20210720/Koruri-Regular.ttf', { family: 'kokuri_r' });
  registerFont('./public/Koruri-20210720/Koruri-Extrabold.ttf', { family: 'kokuri_exb' });

  const one_schedule_h = 160;
  const all_schedule_h = one_schedule_h * schedule_json.bankara_open.length;
  const canvas = createCanvas(320, all_schedule_h);
  const canvas_om = createCanvas(320, 160);
  const ctx = canvas.getContext('2d');
  const ctx_om = canvas_om.getContext('2d');

  let schedule_index = 0;
  for (const match of schedule_json.bankara_open) {
    let date;
    let start_tm;
    let start_date;

    ctx_om.fillStyle = schedule_index % 2 === 0 ? "rgb(169,169,169)" : "rgb(220,220,220)";
    ctx_om.fillRect(0, 0, 320, 180);

    // set start time
    date = new Date(Date.parse(match.start_time));
    start_tm = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + "~";
    start_date = MakeDate(match.start_time)

    ctx_om.fillStyle = "rgb(0, 0, 0)";
    ctx_om.font = '30px "kokuri_exb"';
    ctx_om.fillText(start_date, 10, 40);

    ctx_om.font = '50px "kokuri_exb"';
    ctx_om.fillText(start_tm, 10, 120);

    // draw output canvas
    ctx.drawImage(canvas_om, 0, one_schedule_h * schedule_index);
    schedule_index++;
  }
  return canvas;
}

/**
 * 
 * @param {match.start_time} utc_time 
 */
const MakeDate = (utc_time) => {
  const date = new Date(Date.parse(utc_time));
  //const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeekStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = date.getFullYear();
  const month = ('0' + date.getMonth()).slice(-2);
  const day = ('0' + date.getDay()).slice(-2);
  const start_date = year + "/" + month + "/" + day + " " + dayOfWeekStr[date.getDay()];

  return start_date;
}

const makeAllImg = async () => {
  const one_schedule_h = 160;
  const all_schedule_h = one_schedule_h * schedule_json.bankara_challenge.length;
  const canvas = createCanvas(1600, all_schedule_h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(await scheduleTimeImg(), 0, 0);
  ctx.drawImage(await OpenStageImg(), 320, 0);
  ctx.drawImage(await challengeStageImg(), 960, 0);
  return canvas;
}

/**
 * @param {string} rule 
 * @returns "splatzones.png" | "towercontroll.png" | "rainmaker.png" |"clamblitz.png" | "turfwar.png"
 */
const getRuleAsset = (rule) => {
  return rule === "AREA" ? "splatzones.png" :
    rule === "LOFT" ? "towercontroll.png" :
      rule === "GOAL" ? "rainmaker.png" :
        rule === "CLAM" ? "clamblitz.png" : "turfwar.png"
}

/**
 * @param {Image} image 
 */
const clipCarveSq = (image) => {
  const canvas = createCanvas(640, 320);
  const ctx = canvas.getContext('2d');
  const w = 640;
  const h = 320;
  const r = 15;

  ctx.beginPath();
  ctx.moveTo(0, 0, r);
  ctx.arc(r, h - r, r, Math.PI, Math.PI * 0.5, true);
  ctx.arc(w - r, h - r, r, Math.PI * 0.5, 0, 1);
  ctx.arc(w - r, r, r, 0, Math.PI * 1.5, 1);
  ctx.arc(r, r, r, Math.PI * 1.5, Math.PI, 1);

  ctx.closePath();
  ctx.clip();

  ctx.drawImage(image, 0, 0);
  return canvas;
}