/******************************************************************************************************************************
ee.Screen.js: Taking Screenshots in JPG/PDF/PNG/TXT(UTF-8) formats for the list of urls
see description in md-file
******************************************************************************************************************************/

var fs = require('fs')
var os = require('os')
var delayBeforeScreening = 5000
var whereUrls = 'list.txt' ; if (process.argv[2]) { whereUrls = process.argv[2] }
var puppeteer = require(os.homedir() + '\\node_modules\\puppeteer')
var list = fs.readFileSync(whereUrls, "utf8", (err) => { if (err) throw err }).toString().split("\n")
function sleep(ms) { ms += new Date().getTime(); while (new Date() < ms) {} }

;(async () => {  const browser = await puppeteer.launch()
                 const page = await browser.newPage()
                 for (line in list)
                 {  if (list[line].includes('http'))
                    {  list[line] = list[line].replace("\ufeff", "")
                       var lineUrl = ""
                       var lineTit = require('path').resolve(__dirname, '..') + '\\screenshots\\~flatUrl~.~~~'
                       var lineRes = '1280*full'
                       var lineExt = 'jpg,pdf,png,txt'
                       var jpgExists = 0, pdfExists = 0, pngExists = 0, txtExists = 0
                       var toJpg = 0, toPdf = 0, toPng = 0, toTxt = 0
                       subLines = list[line].split(';')
                       for (field in subLines)
                       {  if (subLines[field].includes('"'))    { lineTit = "" + subLines[field].split("\"").join("") ; continue }
                          if (subLines[field].includes('http')) { lineUrl = "" + subLines[field] ; continue }
                          if (subLines[field].includes('*'))    { lineRes = "" + subLines[field] ; continue }
                          if (subLines[field].includes('jpg'))  { lineExt = "" + subLines[field] }
                          if (subLines[field].includes('pdf'))  { lineExt = "" + subLines[field] }
                          if (subLines[field].includes('png'))  { lineExt = "" + subLines[field] }
                          if (subLines[field].includes('txt'))  { lineExt = "" + subLines[field] }
                       }
                       if (lineTit.includes('~flatUrl~'))
                       {  var lineUrlFlat = lineUrl.replace(/[^a-z0-9.]+/gi,"_")
                          lineTit = lineTit.replace('~flatUrl~',lineUrlFlat)
                       }
                       var getPath = lineTit.substring(0, lineTit.lastIndexOf("\\"))
                       if (!fs.existsSync(getPath)) { fs.mkdirSync(getPath) }
                       var subLineRes = lineRes.split('\*')
                       var shotWidth  = Number(subLineRes[0])
                       if (subLineRes[1].includes('full')) { var shotHeight = 720 } else { var shotHeight = Number(subLineRes[1]) }
                       if (lineExt.includes('jpg')) { toJpg = 1 }
                       if (lineExt.includes('pdf')) { toPdf = 1 }
                       if (lineExt.includes('png')) { toPng = 1 }
                       if (lineExt.includes('txt')) { toTxt = 1 }
                       if (fs.existsSync(lineTit.replace(".~~~",".jpg").split("\"").join(""))) { jpgExists = 1 }
                       if (fs.existsSync(lineTit.replace(".~~~",".pdf").split("\"").join(""))) { pdfExists = 1 }
                       if (fs.existsSync(lineTit.replace(".~~~",".png").split("\"").join(""))) { pngExists = 1 }
                       if (fs.existsSync(lineTit.replace(".~~~",".txt").split("\"").join(""))) { txtExists = 1 }
                       if ( (toJpg == 1 && jpgExists == 0) || (toPdf == 1 && pdfExists == 0) || (toPng == 1 && pngExists == 0) || (toTxt == 1 && txtExists == 0) )
                       {  await page.setViewport({ width: shotWidth, height: shotHeight })
                          await page.goto(lineUrl, {waitUntil: 'networkidle2'}) ; await sleep(delayBeforeScreening)
                          if (toJpg == 1 && jpgExists == 0 && subLineRes[1] == "full")
                          {  await page.screenshot({path: lineTit.replace(".~~~","") + '.jpg', fullPage: true}) }
                          if (toJpg == 1 && jpgExists == 0 && subLineRes[1] != "full")
                          {  await page.screenshot({path: lineTit.replace(".~~~","") + '.jpg'}) }
                          if (toPng == 1 && pngExists == 0 && subLineRes[1] == "full")
                          {  await page.screenshot({path: lineTit.replace(".~~~","") + '.png', fullPage: true}) }
                          if (toPng == 1 && pngExists == 0 && subLineRes[1] != "full")
                          {  await page.screenshot({path: lineTit.replace(".~~~","") + '.png'}) }
                          if (toTxt == 1 && txtExists == 0)
                          {  let shotText = await page.$eval('*', shotAll => shotAll.innerText)
                             fs.writeFile(lineTit.replace(".~~~","") + '.txt', shotText, (err) => { if (err) throw err })
                          }
                          if (toPdf == 1 && pdfExists == 0)
                          {  if (lineExt.includes('Lpdf')) {pdfOrient = true} else {pdfOrient = false}
                             await page.pdf ({ path            : lineTit.replace(".~~~","") + '.pdf',
                                               headerTemplate  : '',
                                               footerTemplate  : '',
                                               printBackground : true,
                                               landscape       : pdfOrient,
                                               format          : 'A4',
                                               margin          : {left:'2cm', top:'1cm', right:'1cm', bottom:'2cm'} })
                          }
                       }
                    }
                 }
                 await browser.close()
              }
 )
()
