/********************************************************************************************************
<br>eeShot.js: shots in JPG/PDF/PNG/TXT(utf-8) formats for the list of urls (needs Node.js and Puppeteer)
<br>y.rytsikau@gmail.com, 2019-03-06
<br>
<br>Using from command line:
<br>*node "c:\path\to\eeShot.js" "c:\path\to\someListWithUrls.anyTextFile"*
<br>
<br>If list has name "list.txt", and located in one directory with this script, second parameter is optional:
<br>*node eeShot.js*
<br>
<br>File "list.txt" must be encoded in UTF-8, format of line is next:
<br>*\<url\>;"<path>\<to>\<shotFile>.ext";width\*height;commaSeparatedFormatsToDo*
<br>
<br>Order of values in line does not matter. All values except <url> are optional, default values are:
<br>*"<thisScriptDir>\eeShot\<flatUrl>.<ext>"* - for path and filename of shot;
<br>*1280*full* - for resolution;
<br>*jpg,pdf,png,txt* - for formats.
<br>Examples of lines:
<br>*https://www.google.com;"C:\screenshots\";1024*768;jpg*
<br>*pdf,txt;https://www.bbc.co.uk/news;1920*full*
<br>Shots in pdf and txt saves full document - txt according to html-markup, pdf - in A4 scaled as 100%.
<br>Existing shots are skipped, new ones are not made.
********************************************************************************************************/
