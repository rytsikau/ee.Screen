`printf()`
/********************************************************************************************************
eeShot.js: shots in JPG/PDF/PNG/TXT(utf-8) formats for the list of urls (needs Node.js and Puppeteer)
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
Examples of lines:
   https://www.google.com;"C:\screenshots\";1024*768;jpg
   pdf,txt;https://www.bbc.co.uk/news;1920*full
Shots in pdf and txt saves full document - txt according to html-markup, pdf - in A4 scaled as 100%.
Existing shots are skipped, new ones are not made.
********************************************************************************************************/

