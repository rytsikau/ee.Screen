# ee.Screen

This script allows you to take screenshots of web pages according to a list of URLs. Several formats are supported - JPG, PDF, PNG and TXT.


### [>> download version 20201108](https://github.com/rytsikau/ee.Screen/raw/master/ee.Screen_20201108.zip)



## Requirements

To run the script, you need to install the NodeJS framework and Google Chrome Puppeteer. To install NodeJS, visit page [nodejs.org](https://nodejs.org). To install Puppeteer, after NodeJS is installed, open a Windows command prompt and type

**`    npm install --save puppeteer    `**



## Quick Start

1. Unpack the downloaded archive
2. Open *urls.txt* in a text editor and paste the URLs of the required pages instead of the existing samples
3. Save *urls.txt*, then run *start.bat*
4. See screenshots in the *..\screenshots* directory



## Usage

The url list file must be encoded with any Unicode type as long as it contains non-latin letters. Run from Windows command line:

**`    node "c:\path\to\ee.screen.js" "c:\path\to\some\urls\list\file.txt"    `**

The file line format is as follows:

**`    url;"path\to\screenshots\screenshotFilename.*";width*height;commaSeparatedFormats    `**

All values except 'url' are optional, default values are:

```
..\screenshots\[flaturl].*   - screenshot has 'flat' url as filename
1280*full                    - width is 1280p, height - full page height
png                          - screenshot format
```

* Encoding of TXT screenshots is UTF8
* If screenshot already exists in the directory, a new one is not created
* Screenshots in PDF and TXT formats are always taken at full page height (PDF - paginated in A4 with 100% scale, TXT - in accordance with HTML markup)
* The order of the parameters in the file line does not matter
* The path and name of the screenshot must be in quotes
* To take a PDF screenshot in landscape orientation specify 'Lpdf' instead of 'pdf'

Examples:

>     https://github.com  
(saves screenshot as *..\screenshots\https_github.com_.png* with 1280p width and full page height)

>     txt,pdf;https://www.bbc.co.uk/news  
(saves two screenshots of TXT and PDF formats in the same directory)

>     https://hp.com/;jpg,Lpdf;1024*768  
(saves part of the page as JPG screenshot with a resolution of 1024*768, and the whole page as PDF screenshot in landscape orientation)

>     1920*full;"C:\My Screenshots\123.*";https://www.ebay.com/;png  
(saves PNG screenshot with 1920p width and full page height in the *C:\My Screenshots* directory with the name *123.png*)



## Tested Configuration

* Google Chrome Puppeteer 1.20.0
* Microsoft Windows 10 Pro x32 version 1909
* Microsoft Windows 10 Pro x64 version 1903
* Node.js 10.16.3 x64



## Developer info

* JavaScript
* Visual Studio Code 1.30



## Tags

automated-screenshot bulk-screenshot google-chrome-puppeteer puppeteer screenshots url-list-screenshot webpage-screenshot webpage-screenshot-jpg webpage-screenshot-pdf webpage-screenshot-png webpage-screenshot-txt



## Author

[(c) 2019-2020 Yauheni Rytsikau](mailto:y.rytsikau@gmail.com)

---
[[program page]](https://rytsikau.github.io/ee.Screen) [[start page]](https://rytsikau.github.io)
