# CS50 Project Submission
## Apps Script Template with Bootstrap 5 and Parcel [![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

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

### Includes

Starter template for [Bootstrap 5](https://v5.getbootstrap.com/).  Instructions for importing it as a [Parcel Recipe](https://parceljs.org/recipes.html).

A .devcontainer for Node and Javascript Projects for [Github Codespaces](https://docs.github.com/en/github/developing-online-with-codespaces).

# References and Related Links
I followed the walkthrough *CLASP Web App, Google Apps Script, Parcel JS, Nodemon, Node JS Workflow Setup Tutorial* [Watch on Youtube](https://www.youtube.com/watch?v=Nf9ExEkySjo), as a guide, as always this author does a great job in stepping through the example.

[Command Line Interface using clasp](https://developers.google.com/apps-script/guides/clasp)

[Clasp's GitHub TypeScript guide](https://github.com/google/clasp/blob/master/docs/typescript.md)

