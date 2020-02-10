/******************************************************************************************************************************
ee.Screen.js // version 20200210
The script allows to take many screenshots of web pages according to the list of URLs.
Multiple formats supported - JPG, PDF, PNG and TXT. For more info see file "Description.md".
(c) 2019 Yauheni Rytsikau, y.rytsikau@gmail.com
******************************************************************************************************************************/

var fs = require('fs')
var os = require('os')
var puppeteer = require(os.homedir() + '\\node_modules\\puppeteer')

var delayBeforeScreening = 3000
var pageLoadTimeout = 10000
var whereUrls = 'list.txt' ; if (process.argv[2]) { whereUrls = process.argv[2] }
var listOfNotProcessed = 'NotProcessed.log'

var firstbytes = new Buffer.alloc(5);
var fd = fs.openSync(whereUrls);
fs.readSync(fd, firstbytes, 0, 5, 0);
fs.closeSync(fd);
var encoding = false;
if (!encoding && firstbytes[0] === 0xEF && firstbytes[1] === 0xBB && firstbytes[2] === 0xBF)                            encoding = 'utf8';
if (!encoding && firstbytes[0] === 0xFE && firstbytes[1] === 0xFF)                                                      encoding = 'utf16be';
if (!encoding && firstbytes[0] === 0xFF && firstbytes[1] === 0xFE)                                                      encoding = 'utf16le';
if (!encoding && firstbytes[0] === 0x00 && firstbytes[1] === 0x00 && firstbytes[2] === 0xFE && firstbytes[3] === 0xFF)  encoding = 'utf32be';
if (!encoding && firstbytes[0] === 0xFF && firstbytes[1] === 0xFE && firstbytes[2] === 0x00 && firstbytes[3] === 0x00)  encoding = 'utf32le';
if (!encoding && firstbytes[0] === 0x2B && firstbytes[1] === 0x2F && firstbytes[2] === 0x76)                            encoding = 'utf7';
if (!encoding && firstbytes[0] === 0xF7 && firstbytes[1] === 0x64 && firstbytes[2] === 0x4C)                            encoding = 'utf1';
if (!encoding)                                                                                                          encoding = 'ascii';
var list = fs.readFileSync(whereUrls, encoding, (err) => { if (err) throw err }).toString().split("\n")
function sleep(ms) { ms += new Date().getTime(); while (new Date() < ms) {} }

;(async () => {  const browser = await puppeteer.launch()
                 const page = await browser.newPage()
                 var notProcessed = []
                 for (line in list)
                 {
                    try
                    {
                       if (list[line].includes('http'))
                       {  list[line] = list[line].replace("\ufeff","").replace("\ufffe","").replace("\u0000feff","").replace("\u2b2f76","").replace("\uf7644c","")
                          var lineUrl = ""
                          var lineTit = require('path').resolve(__dirname, '..') + '\\screenshots\\~flatUrl~.*'
                          var lineRes = '1280*full'
                          var lineExt = 'png'
                          var jpgExists = 0, pdfExists = 0, pngExists = 0, txtExists = 0
                          var toJpg = 0, toPdf = 0, toPng = 0, toTxt = 0
                          subLines = list[line].split(';')
                          for (field in subLines)
                          {  if (subLines[field].includes( '"' )                                  ) { lineTit = "" + subLines[field].split("\"").join("") ; continue }
                             if (subLines[field].includes( '/' )                                  ) { lineUrl = "" + subLines[field]                      ; continue }
                             if (subLines[field].includes( '*' ) && !subLines[field].includes('"')) { lineRes = "" + subLines[field]                      ; continue }
                             if (subLines[field].includes('jpg') && !subLines[field].includes('"')
                                                                 && !subLines[field].includes('/')
                                                                 && !subLines[field].includes('*')) { lineExt = "" + subLines[field] }
                             if (subLines[field].includes('pdf') && !subLines[field].includes('"')
                                                                 && !subLines[field].includes('/')
                                                                 && !subLines[field].includes('*')) { lineExt = "" + subLines[field] }
                             if (subLines[field].includes('png') && !subLines[field].includes('"')
                                                                 && !subLines[field].includes('/')
                                                                 && !subLines[field].includes('*')) { lineExt = "" + subLines[field] }
                             if (subLines[field].includes('txt') && !subLines[field].includes('"')
                                                                 && !subLines[field].includes('/')
                                                                 && !subLines[field].includes('*')) { lineExt = "" + subLines[field] }
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
                          if (fs.existsSync(lineTit.replace(".*",".jpg").split("\"").join(""))) { jpgExists = 1 }
                          if (fs.existsSync(lineTit.replace(".*",".pdf").split("\"").join(""))) { pdfExists = 1 }
                          if (fs.existsSync(lineTit.replace(".*",".png").split("\"").join(""))) { pngExists = 1 }
                          if (fs.existsSync(lineTit.replace(".*",".txt").split("\"").join(""))) { txtExists = 1 }
                          if ( (toJpg == 1 && jpgExists == 0) || (toPdf == 1 && pdfExists == 0) || (toPng == 1 && pngExists == 0) || (toTxt == 1 && txtExists == 0) )
                          {  await page.setViewport({ width: shotWidth, height: shotHeight })
                             await page.goto(lineUrl, {waitUntil: 'networkidle2', timeout: pageLoadTimeout})
                             await sleep(delayBeforeScreening)
                             if (toJpg == 1 && jpgExists == 0 && subLineRes[1] == "full")
                             {  await page.screenshot({path: lineTit.replace(".*","") + '.jpg', fullPage: true}) }
                             if (toJpg == 1 && jpgExists == 0 && subLineRes[1] != "full")
                             {  await page.screenshot({path: lineTit.replace(".*","") + '.jpg'}) }
                             if (toPng == 1 && pngExists == 0 && subLineRes[1] == "full")
                             {  await page.screenshot({path: lineTit.replace(".*","") + '.png', fullPage: true}) }
                             if (toPng == 1 && pngExists == 0 && subLineRes[1] != "full")
                             {  await page.screenshot({path: lineTit.replace(".*","") + '.png'}) }
                             if (toTxt == 1 && txtExists == 0)
                             {  let shotText = await page.$eval('*', shotAll => shotAll.innerText)
                                fs.writeFile(lineTit.replace(".*","") + '.txt', shotText, 'utf8', (err) => { if (err) throw err })
                             }
                             if (toPdf == 1 && pdfExists == 0)
                             {  if (lineExt.includes('Lpdf')) {pdfOrient = true} else {pdfOrient = false}
                                await page.pdf ({ path            : lineTit.replace(".*","") + '.pdf',
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
                    catch (err)
                    {
                       notProcessed.push(list[line])
                    }
                 }
                 fs.writeFile(listOfNotProcessed, notProcessed.join("\n"), 'utf8', (err) => { if (err) throw err })
                 await browser.close()
              }
 )
()
