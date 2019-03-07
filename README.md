    /**********************************************************************************************************
    eeShot.js: Screenshots in JPG/PDF/PNG/TXT(utf-8) formats for the list of urls (needs Node.js and Puppeteer)
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
    Shots in PDF and TXT saves full document - TXT according to HTML-markup, PDF - to A4 scaled as 100%.
    To make PDF shot in landscape orientation, write "Lpdf" instead of "pdf" in the field of need formats.
    Existing shots are skipped, new ones in that case will not be made.
    
    Example of list' content:
       https://www.google.com;"C:\My Screenshots\";1024*768;jpg,Lpdf
       pdf,txt;https://www.bbc.co.uk/news;1920*full
    
    **********************************************************************************************************/
