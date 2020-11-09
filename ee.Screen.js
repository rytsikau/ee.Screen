/***************************************************************************************************
ee.Screen // version 20201108
Takes screenshots of web pages according to a list of URLs
Several formats are supported - JPG, PDF, PNG and TXT
For more info see file *readme.md*
***************************************************************************************************/

var fs = require('fs');
var os = require('os');

var puppeteer = require(os.homedir() + '\\node_modules\\puppeteer');
var screenshotsDefaultFolder = require('path').resolve(__dirname, '..') + '\\screenshots';
var listOfNotProcessed = 'notProcessed.log';
var whereUrls = 'urls.txt'; if (process.argv[2]) { whereUrls = process.argv[2]; }
var delayBeforeScreening = 1500;
var pageLoadTimeout = 15000;
var devicePixelRatio = 1;

var opSys = process.platform;
if (opSys.includes('darwin'))
{
   var customUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6)' +
      ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36';
}
else if (opSys.includes('linux'))
{
   var customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
      ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36';
}
else if (opSys.includes('win'))
{
   var customUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' +
      ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36';
}

function sleep(ms) { ms += new Date().getTime(); while (new Date() < ms) {} }

var firstbytes = new Buffer.alloc(5);
var fd = fs.openSync(whereUrls);
fs.readSync(fd, firstbytes, 0, 5, 0);
fs.closeSync(fd);
var encoding = false;
if (!encoding && firstbytes[0] === 0xEF && firstbytes[1] === 0xBB && firstbytes[2] === 0xBF)
   { encoding = 'utf8'; }
if (!encoding && firstbytes[0] === 0xFE && firstbytes[1] === 0xFF)
   { encoding = 'utf16be'; }
if (!encoding && firstbytes[0] === 0xFF && firstbytes[1] === 0xFE)
   { encoding = 'utf16le'; }
if (!encoding && firstbytes[0] === 0x00 && firstbytes[1] === 0x00 &&
      firstbytes[2] === 0xFE && firstbytes[3] === 0xFF)
   { encoding = 'utf32be'; }
if (!encoding && firstbytes[0] === 0xFF && firstbytes[1] === 0xFE &&
      firstbytes[2] === 0x00 && firstbytes[3] === 0x00)
   { encoding = 'utf32le'; }
if (!encoding && firstbytes[0] === 0x2B && firstbytes[1] === 0x2F && firstbytes[2] === 0x76)
   { encoding = 'utf7'; }
if (!encoding && firstbytes[0] === 0xF7 && firstbytes[1] === 0x64 && firstbytes[2] === 0x4C)
   { encoding = 'utf1'; }
if (!encoding)
   { encoding = 'ascii'; }
var list = fs.readFileSync(whereUrls, encoding,
   (err) => { if (err) { throw err; } }).toString().split("\n");

;(async () => {
   const pupArgs = ['--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--window-position=0,0',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list'];
   const pupOptions = { pupArgs, ignoreHTTPSErrors: true }
   const browser = await puppeteer.launch(pupOptions);
   const page = await browser.newPage();
   var notProcessed = [];

   for (line in list)
   {
      try
      {
         if (list[line].includes('http'))
         {
            list[line] = list[line].replace("\ufeff", "")
                                   .replace("\ufffe", "")
                                   .replace("\u0000feff", "")
                                   .replace("\u2b2f76", "")
                                   .replace("\uf7644c", "")

            var lineUrl = "";
            var lineTit = screenshotsDefaultFolder + '\\~flatUrl~.*';
            var lineRes = '1280*full';
            var lineExt = 'png';

            var jpgExists = pdfExists = pngExists = txtExists = 0;
            var toJpg = toPdf = toPng = toTxt = 0;

            subLines = list[line].split(';');
            for (field in subLines)
            {
               if (subLines[field].includes('"'))
                  { lineTit = "" + subLines[field].split("\"").join(""); continue; }

               if (subLines[field].includes('/'))
                  { lineUrl = "" + subLines[field]; continue; }

               if (subLines[field].includes('*') && !subLines[field].includes('"'))
                  { lineRes = "" + subLines[field]; continue; }

               if (subLines[field].includes('jpg') && !subLines[field].includes('"') &&
                  !subLines[field].includes('/') && !subLines[field].includes('*'))
                  { lineExt = "" + subLines[field]; }
               if (subLines[field].includes('pdf') && !subLines[field].includes('"') &&
                  !subLines[field].includes('/') && !subLines[field].includes('*'))
                  { lineExt = "" + subLines[field]; }
               if (subLines[field].includes('png') && !subLines[field].includes('"') &&
                  !subLines[field].includes('/') && !subLines[field].includes('*'))
                  { lineExt = "" + subLines[field]; }
               if (subLines[field].includes('txt') && !subLines[field].includes('"') &&
                  !subLines[field].includes('/') && !subLines[field].includes('*'))
                  { lineExt = "" + subLines[field]; }
            }

            if (lineTit.includes('~flatUrl~'))
            {
               var lineUrlFlat = lineUrl.replace(/[^a-z0-9.]+/gi, "_");
               lineTit = lineTit.replace('~flatUrl~', lineUrlFlat);
            }

            var getPath = lineTit.substring(0, lineTit.lastIndexOf("\\"));
            if (!fs.existsSync(getPath)) { fs.mkdirSync(getPath); }

            var subLineRes = lineRes.split('\*');
            var shotWidth  = Number(subLineRes[0]);
            if (subLineRes[1].includes('full')) { var shotHeight = 720; }
            else { var shotHeight = Number(subLineRes[1]); }

            if (lineExt.includes('jpg')) { toJpg = 1; }
            if (lineExt.includes('pdf')) { toPdf = 1; }
            if (lineExt.includes('png')) { toPng = 1; }
            if (lineExt.includes('txt')) { toTxt = 1; }

            if (fs.existsSync(lineTit.replace(".*", ".jpg").split("\"").join("")))
               { jpgExists = 1; }
            if (fs.existsSync(lineTit.replace(".*", ".pdf").split("\"").join("")))
               { pdfExists = 1; }
            if (fs.existsSync(lineTit.replace(".*", ".png").split("\"").join("")))
               { pngExists = 1; }
            if (fs.existsSync(lineTit.replace(".*", ".txt").split("\"").join("")))
               { txtExists = 1; }

            if ((toJpg == 1 && jpgExists == 0) || (toPdf == 1 && pdfExists == 0) ||
                (toPng == 1 && pngExists == 0) || (toTxt == 1 && txtExists == 0))
            {
               if (typeof customUserAgent !== 'undefined' && customUserAgent)
                  { await page.setUserAgent(customUserAgent); }
               await page.setViewport({ width: shotWidth,
                                        height: shotHeight,
                                        deviceScaleFactor: devicePixelRatio });
               await page.goto(lineUrl, { waitUntil: 'networkidle2', timeout: pageLoadTimeout });
               await sleep(delayBeforeScreening);

               if (toJpg == 1 && jpgExists == 0 && subLineRes[1] == "full")
               {
                  await page.screenshot({ path: lineTit.replace(".*", "") + '.jpg',
                                          fullPage: true });
               }
               if (toJpg == 1 && jpgExists == 0 && subLineRes[1] != "full")
               {
                  await page.screenshot({ path: lineTit.replace(".*", "") + '.jpg' });
               }
               if (toPng == 1 && pngExists == 0 && subLineRes[1] == "full")
               {
                  await page.screenshot({ path: lineTit.replace(".*", "") + '.png',
                                          fullPage: true });
               }
               if (toPng == 1 && pngExists == 0 && subLineRes[1] != "full")
               {
                  await page.screenshot({ path: lineTit.replace(".*", "") + '.png' });
               }
               if (toTxt == 1 && txtExists == 0)
               {
                  let shotText = await page.$eval('*', shotAll => shotAll.innerText);
                  fs.writeFile(lineTit.replace(".*", "") + '.txt', shotText, 'utf8',
                     (err) => { if (err) { throw err; } });
               }
               if (toPdf == 1 && pdfExists == 0)
               {
                  if (lineExt.includes('Lpdf')) { pdfOrient = true; }
                  else { pdfOrient = false; }
                  await page.pdf({
                     path: lineTit.replace(".*", "") + '.pdf',
                     headerTemplate: '',
                     footerTemplate: '',
                     printBackground: true,
                     landscape: pdfOrient,
                     format: 'A4',
                     margin: { left: '2cm', top: '1cm', right: '1cm', bottom: '2cm' } });
               }
            }
         }
      }
      catch (err)
      {
         notProcessed.push(list[line]);
      }
   }

   fs.writeFile(listOfNotProcessed, notProcessed.join("\n"), 'utf8',
      (err) => { if (err) { throw err; } });

   await browser.close();
})()
