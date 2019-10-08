# ee.Screen
The utility allows to take many screenshots of web pages according to the list of URLs.<br>
Multiple formats supported - JPG, PDF, PNG and TXT.<br>
<br><br>
## Version
20190322<br>
<br>
## System requirements
Node.js, Google Chrome Puppeteer<br>
<br>
## Tested Configuration
Microsoft Windows 10 Pro x64 (build 18362.356), Node.js 10.14.2 (x64), Google Chrome Puppeteer 1.11.0<br>
<br>
## Installation
To install Node.js, visit page https://nodejs.org <br>
To install Puppeteer, after installing Node.js, open Windows command line, and type
```
npm install --save puppeteer
```

## Usage
From Windows command line:
```
node "c:\path\to\ee.Screen.js" "c:\path\to\someListWithUrls.textFile"
```
If list has name *list.txt*, and it located in the same directory as the script, just run *start.bat*.<br>
<br>
## List' content
```
https://www.google.com/;"C:\My Screenshots\123.*";1024*768;jpg,Lpdf
https://github.com
txt,pdf;1920*full;https://www.bbc.co.uk/news
```
File of list must be encoded with any type of unicode, if it has non-latin letters.<br>
Format of line is next:
```
url;"path\to\screenshot.*";width*height;commaSeparatedFormats
```
Order of values in line does not matter.<br>
All values except *url* are optional, default values are:
- "..\ee.Screen\screenshots\" - path for screenshots;<br>
- \<flaturl\>.<extension> - filename;<br>
- jpg,pdf,png,txt - formats;<br>
- 1280*full - resolution.<br>
[//]: # (Hello)"Full" means that screenshot will be taken to the full height of page.<br>
Screenshots in PDF and TXT always have full page height:<br>
PDF - paginated into A4 with a 100% scale, TXT - in accordance with the HTML markup.<br>
To make PDF screenshot in landscape orientation, write "Lpdf" instead of "pdf" in the field of need formats.<br>
Encoding of TXT screenshot - UTF8.<br>
Existing screenshots will be skipped, new ones will not be made in this case.<br>
<br>
## Author
* [**Yauheni Rytsikau**](https://github.com/rytsikau)
