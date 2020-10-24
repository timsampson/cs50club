import 'bootstrap'
import '../scss/main.scss'
document.addEventListener('DOMContentLoaded', (event) => {
  // get the proper URL, dev or exec
  google.script.run.withSuccessHandler(displayNav).getScriptURL();
  // create dropdown with the available clubs
  google.script.run.withSuccessHandler(showClubOptions).getClubListBySchool();
  // run the alert mesage
  google.script.run.withSuccessHandler(clubEnrollmentMessage).getUserClub();
  google.script.run.withSuccessHandler(clubEnrollmentColor).isInClub();
  // create club table
  google.script.run.withSuccessHandler(showClubTable).getClubData();
  document
    .getElementById('clubAppBtn')
    .addEventListener('click', submitClubApplication);
});
let isEnrolled = false;
// Nav display
function displayNav(baseURL) {
  document.getElementById('sign-up-link').href = baseURL + '/index';
  document.getElementById('sign-up-brand').href = baseURL;
  // display users' name
  google.script.run.withSuccessHandler(showUserName).getUserName();
}

// enable the signup button
function enableSignupBtn() {
  document.getElementById("clubAppBtn").removeAttribute("disabled");
}
// disable the signup button 
function disableSignupBtn() {
  document.getElementById("clubAppBtn").setAttribute("disabled", "true");
}

// loader button and table display
function showUserName(userName) {
  let userSchoolNotice = document.getElementById('signedInName');
  userSchoolNotice.innerHTML = userName;
}

function showLoader() {
  document.getElementById("loadingSpinner").classList.remove("invisible");
  document.getElementById("submitBtnLoader").classList.remove("invisible");
}

function removeLoader() {
  document.getElementById("loadingSpinner").classList.add("invisible");
  document.getElementById("submitBtnLoader").classList.add("invisible");
}

function clubEnrollmentColor(alertColor) {
  console.log('alert color is ' + alertColor);
  let clubFormStatus = document.getElementById('clubAlertNotice');
  let classList = clubFormStatus.classList;
  while (classList.length > 0) {
    classList.remove(classList.item(0));
  }
  clubFormStatus.classList.add('alert', 'show');
  switch (alertColor) {
    case true:
      clubFormStatus.classList.add('alert-primary');
      break;
    case false:
      clubFormStatus.classList.add('alert-warning');
      break;
    default:
      clubFormStatus.classList.add('alert-secondary');
  }
}

function clubEnrollmentMessage(clubMessage) {
  console.log('alert message is ' + clubMessage);
  let clubFormStatus = document.getElementById('clubAlertNotice');
  clubFormStatus.innerHTML = clubMessage
  isEnrolled = true;
  enableSignupBtn();
}

function showNavElements() {
  document.getElementById("sign-up-link").classList.remove("invisible");
  document.getElementById("signedInName").classList.remove("invisible");
  document.getElementById("sign-up-brand").classList.remove("invisible");
}

function showUserName(userName) {
  let userSchoolNotice = document.getElementById('signedInName');
  userSchoolNotice.innerHTML = userName;
  // after getting the username and updating the dom, display the NAV
  showNavElements();
}

function clearClubTable() {
  let clubTableBody = document.getElementById('club-table-body');
  let clubTableHead = document.getElementById('club-table-head');
  clubTableHead.deleteRow(0);
  while (clubTableBody.rows.length > 0) {
    clubTableBody.deleteRow(0);
  }
}

function submitClubApplication() {
  disableSignupBtn();
  let clubFormStatus = document.getElementById('clubAlertNotice');
  if (isEnrolled) {
    clubFormStatus.innerHTML = 'You are already enrolled in a club';
    clubFormStatus.classList.add('alert', 'alert-warning', 'show');
    enableSignupBtn();
  }
  else {
    let clubName = document.getElementById("clubChoice").value;
    google.script.run.withSuccessHandler(clubEnrollmentMessage).setRecordClubEntry(clubName);
  }
}

function updateClubTable() {
  clearClubTable();
  showLoader();
  google.script.run.withSuccessHandler(showClubTable).getClubData();
  removeLoader();
}

function showClubTable(clubResults) {
  let clubTableBody = document.getElementById('club-table-body');
  let clubTableHead = document.getElementById('club-table-head');
  let tableHeadData = clubResults.splice(0, 1);

  for (let r = 0; r < tableHeadData.length; r++) {
    let row = clubTableHead.insertRow();
    for (let c = 1; c < tableHeadData[r].length; c++) {
      let cell = row.insertCell();
      let text = document.createTextNode(tableHeadData[r][c]);
      cell.appendChild(text);
    }
  }
  for (let r = 0; r < clubResults.length; r++) {
    let row = clubTableBody.insertRow();
    for (let c = 1; c < clubResults[r].length; c++) {
      let cell = row.insertCell();
      let text = document.createTextNode(clubResults[r][c]);
      if (c == 2 || c == 3 || c == 6) {
        cell.classList.add("text-center");
      } else {
        cell.classList.add("pl-1");
      }
      if (clubResults[r][2] >= clubResults[r][3]) {
        cell.classList.add("table-primary", "border-primary");
      }
      if (c == 4) {
        cell.classList.add("small");
      }
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