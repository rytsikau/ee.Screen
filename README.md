# ee.Screen

ee.Screen allows to take screenshots of web pages according to a list of URLs. The script supports various resolutions and several formats - JPG, PDF, PNG and TXT. Also, headless mode allows to use very high resolutions, such as 5000*5000 pixels. This can be useful, for example, if you need to take a large screenshot from Google Maps.

### [>> download version 20201108](https://github.com/rytsikau/ee.screen/raw/master/ee.screen_20201108.zip)

<br>

## Requirements

ee.Screen uses NodeJS and Google Chrome Puppeteer. To install NodeJS, visit [nodejs.org](https://nodejs.org). To install Puppeteer, after NodeJS is installed, open a Windows Command Prompt and type

**` npm install --save puppeteer `**

<br>

## Quick start

1. Unpack the downloaded archive
2. Open *urls.txt* in a text editor and paste the URLs of the required pages instead of existing samples
3. Save *urls.txt*, then run *run.bat*
4. See result in *\screenshots* folder

<br>

## Usage

The common way to use the script is to run it from the Windows Command Prompt with the path to the URL list file as an argument:

**` node "c:\path\to\ee.screen.js" "c:\path\to\list\file.txt" `**

<br>

## Description of the URL list file

The line has the following format:

**` url,width*height,output `**

Quotes are only needed if the field contains a comma. The order of the fields in the line does not matter. For example:

>     "https://news.sky.com/world",1280*1024,"D:\My files\screenshot01.jpg"

* The `url` is the only required parameter, it must start with the prefix `http://` or `https://`

* To take a screenshot at full page height, replace the *height* value with the word `full`. If the resolution field is missed, the script uses the default `1280*full`

* The `output` field specifies the folder, filename and extension. It can be specified partially, then the missing parts are replaced with default values. In this case, the part of the string to the right of the last slash is interpreted as a filename and/or extension. If the field does not contain slashes, it's fully interpreted as filename and/or extension. The folder and filename supports renaming masks `*flatUrl*`, `*pageTitle*`, `*width*`, `*height*` and custom datetime that recognizes letters *YMDhms* (for example, `*YYYY-MM-DD hh.mm.ss*`). The extension can contain several formats, for example `jpg+pdf+png+txt`. To take PDF screenshot in landscape orientation, specify the extension as `lpdf` instead of `pdf`. If the `output` field is missing, the script uses the default `\screenshots\*flatUrl*.png`

<br>

## More examples

To take PNG screenshot, 1280p width and full page height, save as *\screenshots\https_news.sky.com_world.png*:
>     https://news.sky.com/world

To take JPG and PDF screenshots, 1280p width and full page height, save as *\20210101\https_news.sky.com_world.jpg* and *\20210101\https_news.sky.com_world.pdf*:
>     https://news.sky.com/world,"*YYYYMMDD*\.jpg+pdf"

To take PNG screenshot, 1024p width and 768p height, save as *D:\My files\new screenshot.png*:
>     https://news.sky.com/world,1024*768,"D:\My files\new screenshot"

<br>

## Other notes

* Encoding of TXT screenshots is UTF8
* If some line of the URL list cannot be processed (due to failed parsing, non-existent url, network error, etc.), it's written to the file *not_processed_YYYYMMDDhhmmss.log*
* If the URLs list contains non-latin letters, it must be in Unicode (any type)
* Screenshots in PDF and TXT formats are always taken at full page height (PDF - paginated in A4 with 100% scale, TXT - in accordance with HTML markup)

<br>

## Terms of use

* This software is free for non-commercial use and is provided 'as is' without warranty of any kind, either express or implied
* The author will not be liable for data loss, damages or any other kind of loss while using or misusing this software
* The author will not be liable for the misuse of content obtained using this software, including copyrighted, age-restricted, or any other protected content

<br>

## Developer info

* JavaScript
* Visual Studio Code 1.30

<br>

## Tested configuration

* Chrome Puppeteer 1.20.0
* Windows 10 Pro x64 version 1909
* Node.js 10.16.3 x64

<br>

## Tags

automated batch bulk jpg list multiple pdf png screenshots snapshots text txt url webpages

<br>

## About

Takes screenshots of web pages according to a list of URLs. Supports various resolutions and several formats - JPG, PDF, PNG and TXT

---
[[program page]](https://rytsikau.github.io/ee.Screen) [[start page]](https://rytsikau.github.io) [[author e-mail]](mailto:y.rytsikau@gmail.com)
