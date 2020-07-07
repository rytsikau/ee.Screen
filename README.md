# ee.Screen - version 20200210
This script allows to take screenshots of web pages according to the list of URLs. Multiple formats supported - JPG, PDF, PNG and TXT
<br>

## Quick Start
1. Open the *list.txt* file in a text editor
2. Paste your list of URLs there, instead of existing sample lines
3. Run *start.bat*
4. See screenshots in *"..\ee.Screen\screenshots\"* directory
<br>

## Requirements
* Node.js
* Google Chrome Puppeteer
<br>

## Tested Configuration
* Microsoft Windows 10 Pro x64 1903
* Node.js 10.16.3 x64
* Google Chrome Puppeteer 1.20.0
<br>

## Installation
To install Node.js, visit page https://nodejs.org<br>
To install Puppeteer, after installing Node.js open Windows command line, and type
```
npm install --save puppeteer
```
<br>

## Usage information
File with URLs must be encoded with any type of unicode, if it has non-latin letters. Running from Windows command line:
```
node "c:\path\to\ee.Screen.js" "c:\path\to\some\list.txt"
```
If list has name *list.txt*, and it located in the same directory as the script, just run *start.bat*<br>
<br>

## List format description
Examples:
```
https://www.google.com/;"C:\My Screenshots\123.*";1024*768;jpg,Lpdf
https://github.com
txt,pdf;https://www.bbc.co.uk/news
1920*full;png;https://www.ebay.com/
```
Format of line is next:
```
url;"path\to\screenshots\filename.*";width*height;commaSeparatedFormats
```
* Order of values in line does not matter
* Quotation marks are required
* All values except *url* are optional, default values are:
    - *"..\ee.Screen\screenshots\\<flaturl\>.<extension\>"* - path for screenshots and filename
    - *1280\*fullHeightOfPage* - resolution
    - *png* - format
* Screenshots in PDF and TXT always have full page height (PDF - paginated into A4 with a 100% scale, TXT - in accordance with the HTML markup)
* To make PDF screenshot in landscape orientation, write "Lpdf" instead of "pdf" in the field of need formats
* Encoding of TXT screenshots - UTF8
* Existing screenshots will be skipped, new ones will not be made in this case
<br>

## Developer information
* JavaScript
* Visual Studio Code 1.30
<br>

## Author
* [**Yauheni Rytsikau (Eugen Rytikov)**](https://github.com/rytsikau)
