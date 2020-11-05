# CS50 Project Submission

This is the final project for my summer Professional Development, Harvard's CS50 on [Edx.org](https://courses.edx.org/courses/course-v1:HarvardX+CS50+X/course/).

![Gif of Project](https://raw.githubusercontent.com/timsampson/cs50club/main/docs/cs50formDemo.gif)

## Description

Google Apps for Education, which includes [Google Apps Script](https://developers.google.com/apps-script), and which are currently available for no cost, is used at the school at which I teach. Over the past few years, I've made use of Apps Script for simple tasks, but had not yet put together a custom form backed by Google Sheets. With this project, I had an opportunity to use any web technology stack, so for this final project, I've decided to make a custom club that uses Google Sheets as a database.

The project makes use of many freely available, open source libraries and tools. I've included some links below, but won't go into all the details in this description of the project. For details on Google Appsscript (GAS) usage, see [free use tier](https://developers.google.com/apps-script/guides/services/quotas).

The view is a simple form where the user chooses a club and if the club has room, then the user is allowed to join the club. Some of the features which may not be obvious to the user, but were implemented, include:

### Authentication and Authorization

1. Authentication is handled by Google when you login to Google Apps.
2. Authorization is based on the user's level, teacher or student, which is read from the Spreadsheet.

### Data

1. **Data Source**: A Google Sheet is as a data source, tabs are used as tables are in a traditional database.  
   - If an data administrator needs to edit something and they are familiar with a spreadsheet, they can simply open the spreadsheet and make the edits.
   - The sheet has many tabs that mock data a school might track, students, staff, clubs, rooms, classes... it is not complete, but comprehensive enough for data needed in this example app.
2. **Read**: If the user is a teacher (in the staff tab), they can see the list for the all levels, Lower School (LS), Middle School (MS) and High School (HS), but they don't have an option to join the club. Alternatively, if the user is a student (in the student tab), the table will display the clubs available for their level.
3. **Write**: When a student successfully enrolls in a club, a row is written to the clubRecord tab and the row includes a time stamp, the student's email address, thier school level, the club moderator (from the club tab), and the name of the chosen club.
4. **UI Update**: Upon login, the club table will display the users relevant clubs with data from the club tab. If the student is already in a club, the notification alert will display their club, and they will be unable to choose another club.

### Views and Notification

1. As mentioned in the Data section, the Sign up page table can be filtered based on the user's school, lower, middle or high.
2. The drop down for selecting the club is filtered based on the user's school (LS, MS, HS).
3. The enrollment table update upon submission and display updated values.
4. The alert component at the top of the sign in page will display:
   - the club name if the student is already in a club
   - a styled success message if the resource is provisioned, if the student joins the club.
   - a styled error message if the club chosen is already full.
5. If there is a successful enrolment, the student will get an email notification. When the user logs in the app has access to the email property on the user object. The table row with the updated club will also be styled green.

### Deployment and Hosting

1. Clasp enables local development in Typescript and deployment to Google's Apps Script (GAS) hosting, link-> [clasp](https://github.com/google/clasp)
2. Parcel for bundling Bootstrap 5 and also for inlining CSS and JS, which is necessary for GAS hosting, link-> [parceljs.org](https://parceljs.org/)

#### Get Started

Clone the repo, run `npm install`, install Clasp globally `npm install @google/clasp -g` and if prompted for a dependency, inquirer@^6.0.0, run `npm install inquirer@^6.0.0 -g`.

If you are using Codespaces, Log in to clasp `clasp login --no-localhost`, othewise you can use `clasp login` at the terminal.

Delete the existing .clasp.json file and then create your starter web app: `clasp create --type webapp --title "Your Title" --rootDir ./appsscript`

#### Build and Deploy

Once it is setup, add a dist folder. run your build with `parcel build client/index.html --no-minify --no-source-maps --no-cache`. I used the live server extension to test if the styling and javascript worked as expected.

To push your deploy, use the command `npm run bld`

Before you can view your webapp, you need an initial deploy. One way is to run `clasp deploy --description "Initial Deploy"`, or you can change the description to anything you see fit. You can also do this from the Apps Script dashboard, `clasp open` will get you to your project on the dashboard and from there you can use the menu options.

This project also includes a `.devcontainer` configuration folder for in browser development using [Github Codespaces](https://docs.github.com/en/github/developing-online-with-codespaces).

## Rationale

_This can all be done using the Appssript IDE, so why have Clasp and Parcel for a simple form?_

_Why a form?_

There was a need at my school for forms that have features not available in Google forms, such as:

- dynamic drop downs which update when the data sources is updated
- shows a custom message on the form when a certain number of repsonses have been recorded
- stops allowing repsonses after a certain condition has been met

_Why Clasp?_

- Clasp allows the use of a local IDE, which gives you so many wonderful benefits, but I mostly wanted Git integration and to use VS Code.
- Parcel
  - bundling: projects I am looking forward to building will likely need to integrate external libraries. For this project, I tested bundling using Bootstrap.
  - inlining: it more convenient to work with a conventional project structure and have a Parcel plugin convert it to a format required by GAS, than to structure your project as a typical GAS project. An additional benefit is to use a modern workflow that will prepare you to work on other platforms.

Once these requirements have been demonstrated in a simple form, making a more complex apps based on this template and these workflows can be implimented much more quickly. I will using this project as a template for quite a few projects this year and beyond.

## Challenges and Gotchas

- **Display**: Having the UI update only after the data has been fetched.  

   - I used `SpreadsheetApp.flush();` to try and ensure that the update had a chance to finish before the UI was updated, but it didn't apear to fix it constently. I found that instead of refreshing the tab values with `.getDataRange().getValues()`, using `getSheetByName` to again fetch the tab and then getting the values would return the updated values. I'm not sure if this is becuase it just took longer and was able to fetch the new values after the cache was updated or always returned the current version. I couldn't find any documentation on the implimentation. 

   - After finishing the first implimentation, I took a different approach and just updated the table on the client side instead of trying to re-fetch it and hope that I hit a new cache instead of a stale cache. 

   - Seeing different components updating a different times depending on when the promisses got returned was inconsistent and was visually distracting. At this point I also realized that having separate function calls to the server is not necessary and instead updated so that there is one call that returns an object with the data needed. Since each call is made with the users account ID, the return can provide the customized info whether the user is a teacher, or a student and whether that student is already in a club or not. 

- **NPM installs**: Which package is absolutely needed as a development, project or global install? When jumping around machines during this project, it was a bit of a pain. Once I started spinning up dev containers, it was easy to clarify the needs, as each new container was a clean start, I could minimize the steps and still confirm a successful deploy.
- **Node scripts**: When the build worked and I started with a newly cloned project, the build failed as there was no dist folder checked in. Git doesn't like empty folders, so the workaround was creating a new folder on each build. The Node.js docs were actually quite helpful.
- **Is one page enough?**: I initially had a home page with a special display only for the teacher login along with the signup, but as I worked on the UI, I realized I should narrow down the project and use the time to resolve issues such as the UI updating without having up to date URLS, table contents or the user name.
- **Mock Data**: Creating enough users and data to model a small school. I used [Mockaroo](https://www.mockaroo.com/) to create enough user information to have 1000 rows with 14 columns of data. Mockaroo's free use option was very helpful in minimizing the time it took to fill up a spreadsheet with mock data.
- **Is this Complete?** As I wrap up this project, I see there are places to optimize and separate the concerns even more, but the app functions as needed and I'm happy with this submission.  The intention was to create a working example that I could use as a template for common projects I be working on next year, and I think I've arrived at that point 😊🎂🎉

## References and Related Links

For integrating a Google Sheet with a web app, the YouTube playlist [Google Apps Script - Web App Tutorial](https://www.youtube.com/watch?v=RRQvySxaCW0&list=PLv9Pf9aNgemt82hBENyneRyHnD-zORB3l) was invaluable.

For the build setup I followed the walkthrough _CLASP Web App, Google Apps Script, Parcel JS, Nodemon, Node JS Workflow Setup Tutorial_ [Watch on YouTube](https://www.youtube.com/watch?v=Nf9ExEkySjo), as a guide, as always this author does a great job in stepping through the example.

[Command Line Interface using clasp](https://developers.google.com/apps-script/guides/clasp)

[Clasp's GitHub TypeScript guide](https://github.com/google/clasp/blob/master/docs/typescript.md)

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
