# Web Crawler for NUS Mod
This code is for a data scraper for the courses I am interested in knowing more about in the National University of Singapore, Economics and History.
<br/>
This will scrap data for the course codes, names and also their abouts to give more information within a JSON file, which can be viewed and accessed through various means

## Data structure for JSON files
The json files are all labelled by the page number, and have an array of courses that are scrapped through puppeteer and after a gruelling hour or two of parsing and identifying the html structure on nus mod. Have fun viewing and trying out this dataset!
```
{
    "courseCode": "",
    "courseName": "",
    "about": ""
  }
```
For instance 1.courseCode[0] will return the first courseCode of the first page.

## How to get data
Copy and paste the javascript code into a new node.js project
```
npm i puppeteer
```
Also ensure that puppeteer, the web scraper is installed beforehand.
Alternatively, you can also extract the data from the json files in the courses folder

** Thank you!* *
