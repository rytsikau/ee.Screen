# ee.Screen

This utility allows to take many screenshots of web pages according to the list of URLs.
Multiple formats supported - JPG, PDF, PNG and TXT.


## Version
20190322


## System requirements
Node.js, Google Chrome Puppeteer


## Tested Configuration
Microsoft Windows 10 Pro x64 (build 18362.356), Node.js 10.14.2 (x64), Google Chrome Puppeteer 1.11.0


## Installation
To install Node.js, visit page https://nodejs.org
To install Puppeteer, after installing Node.js, open Windows command line, and type "npm install --save puppeteer"


## Usage
From Windows command line:
```
node "c:\path\to\ee.Screen.js" "c:\path\to\someListWithUrls.textFile"
```
If list has name "list.txt", and located in the same directory with script, simply run "start.bat".


## List' content
Example:
```
https://www.google.com/;"C:\My Screenshots\123.*";1024*768;jpg,Lpdf
https://github.com
txt,pdf;1920*full;https://www.bbc.co.uk/news
```
File of list must be encoded with any type of unicode, if it has non-latin letters.
Format of line is next:
```
url;"path\to\screenshot.*";width*height;commaSeparatedFormats
```
Order of values in line does not matter. All values except "url" are optional, default values are:
"..\ee.Screen\screenshots.*" - for path and name of screenshot file(s);
jpg,pdf,png,txt - for formats;
1280*full - for resolution.
"Full" means that screenshot will be taken to the full height of page.
Screenshots in PDF and TXT always have full page height:
PDF - paginated into A4 with a 100% scale, TXT - in accordance with the HTML markup.
To make PDF screenshot in landscape orientation, write "Lpdf" instead of "pdf" in the field of need formats.
Encoding of TXT screenshot - UTF8.
Existing screenshots will be skipped, new ones will not be made in this case.


## Author
* [**Yauheni Rytsikau**](https://github.com/rytsikau)
