# ee.Screen
The script allows to take many screenshots of web pages according to the list of URLs.<br>
Multiple formats supported - JPG, PDF, PNG and TXT.

## Quick Start
1. Open the *list.txt* file in a text editor.
1. Paste your list of URLs there, instead of existing example lines.
1. Run *start.bat*
1. See screenshots in *"..\ee.Screen\screenshots\"* directory.
##
<br><br>

## Version
20200210<br>
<br>
## System requirements
Node.js, Google Chrome Puppeteer<br>
<br>
## Tested Configuration
Microsoft Windows 10 Pro x64 1903 (build 18362.356), Node.js 10.16.3 (x64), Google Chrome Puppeteer 1.20.0<br>
<br>
## Installation
To install Node.js, visit page https://nodejs.org <br>
To install Puppeteer, after installing Node.js, open Windows command line, and type
```
npm install --save puppeteer
```
## Usage
File of URLs' list must be encoded with any type of unicode, if it has non-latin letters.<br>
Running from Windows command line:
```
node "c:\path\to\ee.Screen.js" "c:\path\to\someListWithUrls.textFile"
```
If list has name *list.txt*, and it located in the same directory as the script, just run *start.bat*<br>
<br>
## List formatting
Example:
```
https://www.google.com/;"C:\My Screenshots\123.*";1024*768;jpg,Lpdf
https://github.com
txt,pdf;https://www.bbc.co.uk/news
1920*full;png;https://www.ebay.com/
```
Format of line is next:
```
url;"path\to\screenshots\screenshotFilename.*";width*height;commaSeparatedFormats
```
- Order of values in line does not matter.<br>
- Quotation marks are required.<br>
- All values except *url* are optional, default values are:
    - *"..\ee.Screen\screenshots\\<flaturl\>.\*"* - path for screenshots and filename;<br>
    - *1280\*full* - resolution;<br>
    - *png* - format;<br>
- "Full" means that screenshot will be taken to the full height of page.<br>
- Screenshots in PDF and TXT always have full page height: PDF - paginated into A4 with a 100% scale, TXT - in accordance with the HTML markup.<br>
- To make PDF screenshot in landscape orientation, write "Lpdf" instead of "pdf" in the field of need formats.<br>
- Encoding of TXT screenshots - UTF8.<br>
- Existing screenshots will be skipped, new ones will not be made in this case.<br><br>

## Author
* [**Yauheni Rytsikau**](https://github.com/rytsikau)
