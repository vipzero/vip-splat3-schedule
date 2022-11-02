import { makeScheduleImgBuf } from "../../src/makeSchedule"

export default async function handler(req, res) {
  const imageBuffer = await makeScheduleImgBuf()

  res.setHeader("Content-Type", "image/jpg")
  const hour = 60 * 60
  res.setHeader("Cache-Control", `s-maxage=${1 * hour},max-age=${1 * hour}`)

  res.send(imageBuffer)
}
