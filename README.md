# CS50 Project Submission

This is the final project for my summer PD, CS50 on [Edx.org](https://courses.edx.org/courses/course-v1:HarvardX+CS50+X/course/).  

### Description

The school I work at uses Google Apps for Education, which includes [Google Apps Script](https://developers.google.com/apps-script), all of which are currently availabe for free, for details on useage, see [free use tier](https://developers.google.com/apps-script/guides/services/quotas).  Over the past few years, I've made use of Apps Script for simple tasks, but had not yet put together a custom form backed by Google Sheets, so for this final project, I've decided to do just that.

The project makes use of many freely available, open source libraries and tools. I've included some links below, but won't go into all the details in this description of the project.

The view is a simple form where the user chooses a club and if the club has room, then the user is allowed to join the club.  Some of the features which may not be obvious to the user, but were implemented include:

##### Authentication

1. Authentication is handled by Google's login.
2. Authorization is based on the user's level, teacher or student. 

##### Data

1. A Google Sheet is as a data source
2. If the user is a teacher, they can see the list for the all levels, Lower School (LS), Middle School (MS) and High School (HS), but they don't have an option to join the club.
3. If the user is a student, the table will display the clubs available for their level.
4. Upon login the table will display the clubs for the users with currently club enrollment numbers. If the student is in a club, they notice will display their club.

#### Views and Notification

1. As mentioned in the Data section, the Sign up page table can be filtered based on the user's school, lower, middle or high.
2. The drop down for selecting the club is filtered based on the user's school (LS, MS, HS).
3. The enrollment table update upon submission and display updated values.
4. The alert component at the top of the sign in page will display:
    * the club name if the student is already in a club
    * a styled success message if the resource is provisioned, if the student joins the club.
    * a styled error message if the club chosen is already full.
5. If there is a successful enrolment, the student will get an email notification.

#### Deployment and Hosting
1. Clasp ~ enables local development in Typescript and deployment to  Google's Apps Script (GAS) hosting. [clasp](https://github.com/google/clasp)
2. Parcel for bundling Bootstrap 5 and also for inlining CSS and JS, which is necessary for GAS hosting. [parceljs.org](https://parceljs.org/)

[Example Site URL](https://script.google.com/a/macros/dishs.tp.edu.tw/s/AKfycbx26XCqju00NoeCmM4PgLhlsLd-Ft0J1Jy202AvESlQoU3ryPM/exec)

This is my CS50 project submission which uses Google Sheets as a database, and Clasp and Parcel for deploying modern Javascript to Google's Apps Script (GAS) projects V8 engine. 

### Get Started

Clone the repo, run `npm install`, install Clasp globally `npm install @google/clasp -g` and if prompted for a dependency, inquirer@^6.0.0,  run `npm install inquirer@^6.0.0 -g`. 

If you are using Codespaces, Log in to clasp `clasp login --no-localhost`, othewise you can use `clasp login` at the terminal.

Delete the existing .clasp.json file and then create your starter web app: `clasp create --type webapp  --title "Your Title" --rootDir ./appsscript`

### Build and Deploy

Once it is setup, add a dist folder. run your build with `parcel build client/index.html --no-minify --no-source-maps --no-cache`.  I used the live server extension to test if the styling and javascript worked as expected. 

To push your deploy, use the command `npm run bld`

Before you can view your webapp, you need an  initial deploy. One way is to run `clasp deploy --description "Initial Deploy"`, or you can change the description to anything you see fit.  You can also do this from the Apps Script dashboard, `clasp open` will get you to your project on the dashboard and from there you can use the menu options.

This project also includes a `.devcontainer` configuration folder for in browswer development using [Github Codespaces](https://docs.github.com/en/github/developing-online-with-codespaces).

# References and Related Links
For integrating a Google Sheet with a web app, the Youtube playlist [Google Apps Script - Web App Tutorial](https://www.youtube.com/watch?v=RRQvySxaCW0&list=PLv9Pf9aNgemt82hBENyneRyHnD-zORB3l) was invaluable.

For the build setup I followed the walkthrough *CLASP Web App, Google Apps Script, Parcel JS, Nodemon, Node JS Workflow Setup Tutorial* [Watch on Youtube](https://www.youtube.com/watch?v=Nf9ExEkySjo), as a guide, as always this author does a great job in stepping through the example.

[Command Line Interface using clasp](https://developers.google.com/apps-script/guides/clasp)

[Clasp's GitHub TypeScript guide](https://github.com/google/clasp/blob/master/docs/typescript.md)

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

