import 'bootstrap'
import '../scss/main.scss'

document.addEventListener('DOMContentLoaded', (event) => {
  // get the proper URL, dev or exec
  google.script.run.withSuccessHandler(displayNav).getScriptURL();
  // create dropdown with the available clubs
  google.script.run.withSuccessHandler(showClubOptions).getClubListBySchool();
  // run the alert mesage
  google.script.run.withSuccessHandler(isAlreadyEnrolled).getUserClub();
  // create club table
  google.script.run.withSuccessHandler(showClubTable).getClubData();
  document
    .getElementById('clubAppBtn')
    .addEventListener('click', submitClubApplication);

});

let isEnrolled = false;
//submitting the application
function showUserName(userName) {
  let userSchoolNotice = document.getElementById('signedInName');
  userSchoolNotice.innerHTML = userName;
}

function displayNav(baseURL) {
  document.getElementById('sign-up-link').href = baseURL + '/index';
  document.getElementById('sign-up-brand').href = baseURL;
  // display users' name
  google.script.run.withSuccessHandler(showUserName).getUserName();
}


function showLoader() {
  document.getElementById("loadingSpinner").classList.remove("invisible");
  document.getElementById("submitBtnLoader").classList.remove("invisible");
}

function removeLoader() {
  document.getElementById("loadingSpinner").classList.add("invisible");
  document.getElementById("submitBtnLoader").classList.add("invisible");
}

function isAlreadyEnrolled(isInClub) {
  let clubFormStatus = document.getElementById('clubAlertNotice');
  let classList = clubFormStatus.classList;
  while (classList.length > 0) {
    classList.remove(classList.item(0));
  }
  if (isInClub) {
    clubFormStatus.innerHTML = 'You are already enrolled in ' + isInClub;
    clubFormStatus.classList.add('alert', 'alert-primary', 'show');
    isEnrolled = true;
  }
  else {
    clubFormStatus.innerHTML = 'Please choose a club from the dropdown.';
    clubFormStatus.classList.add('alert', 'alert-warning', 'show');
    isEnrolled = false;
  }
}

function clubEnrollmentMessage(clubName) {
  let clubFormStatus = document.getElementById('clubAlertNotice');
  let classList = clubFormStatus.classList;
  while (classList.length > 0) {
    classList.remove(classList.item(0));
  }
  if (clubName) {
    clubFormStatus.innerHTML = 'Welcome to the ' + clubName + ' club';
    clubFormStatus.classList.add('alert', 'alert-success', 'show');
  } else {
    clubFormStatus.innerHTML = 'Sorry, your choice is already full, please select another option.';
    clubFormStatus.classList.add('alert', 'alert-danger', 'show');
  }
}

function showUserName(userName) {
  let userSchoolNotice = document.getElementById('signedInName');
  userSchoolNotice.innerHTML = userName;
  // after getting the username and updating the dom, display the NAV
  document.getElementById("main-nav").classList.remove("invisible");
}

function showStudentSchool() {
  let userName = document.getElementById('studentSchool');
  userSchoolNotice.innerHTML = google.script.run.getStudentSchool();
}

function clearClubTable() {
  let clubTableBody = document.getElementById('club-table-body');
  while (clubTableBody.rows.length > 0) {
    clubTableBody.deleteRow(0);
  }
}

function submitClubApplication() {
  let clubFormStatus = document.getElementById('clubAlertNotice');
  console.log('Enrolled status is; ' + isEnrolled);

  if (isEnrolled) {
    console.log('Not Processing');
    clubFormStatus.innerHTML = 'You are already enrolled in a club';
    clubFormStatus.classList.add('alert', 'alert-warning', 'show');
  } else {
    let clubName = document.getElementById("clubChoice").value;
    showLoader();
    google.script.run.withSuccessHandler(clubEnrollmentMessage).setRecordClubEntry(clubName);
    clearClubTable();
    updateClubData();
    isEnrolled = true;
  }
}

// app script returns the stale copy of the sheet values, so adding this new function....
function updateClubData() {
  google.script.run.withSuccessHandler(showClubTable).getClubData();
}

function showClubTable(clubResults) {
  let clubTableBody = document.getElementById('club-table-body');
  for (let r = 0; r < clubResults.length; r++) {
    let row = clubTableBody.insertRow();
    for (let c = 1; c < clubResults[r].length - 1; c++) {
      let cell = row.insertCell();
      let text = document.createTextNode(clubResults[r][c]);
      cell.appendChild(text);
    }
  }
  removeLoader();
}

function showClubOptions(optionsList) {
  let clubListOptions = document.getElementById('clubChoice');
  for (let i = 0; i < optionsList.length; i++) {
    var option = document.createElement("option");
    option.text = optionsList[i];
    clubListOptions.add(option);
  }
}