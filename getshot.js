// [NODE] [PUPPETEER] getshot.js: screenshots from the list of urls
// using from command line: node "c:\path\to\getshot.js" "c:\path\to\list\whereUrls.txt"
// where "whereUrls.txt" has encoding 'utf16le' and lines like "url;fullFileNameToSave"

var whereUrls      = 'c:\\Users\\[user-account]\\Downloads\\urls.txt'
var wherePuppeteer = 'c:\\Users\\[user-account]\\node_modules\\puppeteer'

if ( process.argv[2] ) { whereUrls = process.argv[2] }
const fs = require('fs')
const puppeteer = require(wherePuppeteer)
;(async () => {
                const browser = await puppeteer.launch()
                const page = await browser.newPage()
                await page.setViewport({ width: 1280, height: 800 })
                var array = fs.readFileSync(whereUrls, 'utf16le').toString().split("\n")
                for (i in array)
                {
                    if (array[i].length > 1)
                    {
                        bits = array[i].split(';')
                        shotFile = "" + bits[1]
                        if (!fs.existsSync(shotFile))
                        {
                            shotUrl = "" + bits[0]
                            console.log(shotUrl)
                            await page.goto(shotUrl, { waitUntil: 'networkidle2' })
                            let shotText = await page.$eval('*', shotAll => shotAll.innerText)
                            fs.writeFile(shotFile, shotText, 'ascii', (err) => { if (err) throw err })
                        }
                    }
                }
                await browser.close()
              }
)
()
