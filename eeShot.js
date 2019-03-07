    /**********************************************************************************************************
    eeShot.js: Screenshots in JPG/PDF/PNG/TXT(utf-8) formats for the list of urls (needs Node.js and Puppeteer)
    y.rytsikau@gmail.com, 2019-03-06
    
    Using from command line:
       node "c:\path\to\eeShot.js" "c:\path\to\someListWithUrls.anyTextFile"
    If list has name "list.txt", and located in one directory with this script, second parameter is optional:
       node eeShot.js
    File "list.txt" must be encoded in UTF-8, format of line is next:
       <url>;"<path>\<to>\<shotFile>.ext";width*height;commaSeparatedFormatsToDo
    Order of values in line does not matter. All values except <url> are optional, default values are:
       "<thisScriptDir>\eeShot\<flatUrl>.<ext>" - for path and filename of shot;
       1280*full - for resolution;
       jpg,pdf,png,txt - for formats.
    Shots in PDF and TXT saves full document - TXT according to HTML-markup, PDF - to A4 scaled as 100%.
    To make PDF shot in landscape orientation, write "Lpdf" instead of "pdf" in the field of need formats.
    Existing shots are skipped, new ones in that case will not be made.
    
    Example of list' content:
       https://www.google.com;"C:\My Screenshots\";1024*768;jpg,Lpdf
       pdf,txt;https://www.bbc.co.uk/news;1920*full
    
    **********************************************************************************************************/

var fs = require('fs')
var os = require('os')
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
                       var lineTit = __dirname + '\\eeShot\\~flatUrl~.ext'
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
                       await page.setViewport({ width: shotWidth, height: shotHeight })
                       await page.goto(lineUrl, {waitUntil: 'networkidle0'}) ; await sleep(100)
                       if (fs.existsSync(lineTit.replace(".ext",".jpg").split("\"").join(""))) { jpgExists = 1 }
                       if (fs.existsSync(lineTit.replace(".ext",".pdf").split("\"").join(""))) { pdfExists = 1 }
                       if (fs.existsSync(lineTit.replace(".ext",".png").split("\"").join(""))) { pngExists = 1 }
                       if (fs.existsSync(lineTit.replace(".ext",".txt").split("\"").join(""))) { txtExists = 1 }
                       if (toJpg == 1 && jpgExists == 0 && subLineRes[1] == "full")
                       {  await page.screenshot({path: lineTit.replace(".ext","") + '.jpg', fullPage: true}) }
                       if (toJpg == 1 && jpgExists == 0 && subLineRes[1] != "full")
                       {  await page.screenshot({path: lineTit.replace(".ext","") + '.jpg'}) }
                       if (toPng == 1 && pngExists == 0 && subLineRes[1] == "full")
                       {  await page.screenshot({path: lineTit.replace(".ext","") + '.png', fullPage: true}) }
                       if (toPng == 1 && pngExists == 0 && subLineRes[1] != "full")
                       {  await page.screenshot({path: lineTit.replace(".ext","") + '.png'}) }
                       if (toTxt == 1 && txtExists == 0)
                       {  let shotText = await page.$eval('*', shotAll => shotAll.innerText)
                          fs.writeFile(lineTit.replace(".ext","") + '.txt', shotText, (err) => { if (err) throw err })
                       }
                       if (toPdf == 1 && pdfExists == 0)
                       {  if (lineExt.includes('Lpdf')) {pdfOrient = true} else {pdfOrient = false}
                          await page.pdf ({ path            : lineTit.replace(".ext","") + '.pdf',
                                            headerTemplate  : '',
                                            footerTemplate  : '',
                                            printBackground : true,
                                            landscape       : pdfOrient,
                                            format          : 'A4',
                                            margin          : {left:'2cm', top:'1cm', right:'1cm', bottom:'2cm'} })
                       }
                    }
                 }
                 await browser.close()
              }
 )
()
