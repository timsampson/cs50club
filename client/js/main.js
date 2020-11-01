import 'bootstrap'
import '../scss/main.scss'
document.addEventListener('DOMContentLoaded', (event) => {
  // fetchInitial page data for signup page
  google.script.run.withSuccessHandler(updateSignupPageUI).getSuPageUIdata();

  document
    .getElementById('clubAppBtn')
    .addEventListener('click', submitClubApplication);
});
// Nav 
function updateSignupPageUI(suPageUIdata) {
  showLinks(suPageUIdata.scriptURL);
  showUserName(suPageUIdata.userName);
  showClubOptions(suPageUIdata.clubNamesBySchool);
  checkEnrollment(suPageUIdata);
  showClubTable(suPageUIdata.clubData);
}
function showLinks(baseURL) {
  document.getElementById('sign-up-link').href = baseURL + '/index';
  document.getElementById('sign-up-brand').href = baseURL;
  document.getElementById("sign-up-link").classList.remove("invisible");
  document.getElementById("sign-up-brand").classList.remove("invisible");
}

function showUserName(userName) {
  let userSchoolNotice = document.getElementById('signedInName');
  userSchoolNotice.innerHTML = userName;
  document.getElementById("signedInName").classList.remove("invisible");
}

// enable the signup button
function enableSignupBtn() {
  document.getElementById("clubAppBtn").disabled = false;
}

// disable the signup button 
function disableSignupBtn() {
  document.getElementById("clubAppBtn").disabled = true;
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
  let clubFormStatus = document.getElementById('clubAlertNotice');
  let classList = clubFormStatus.classList;
  while (classList.length > 0) {
    classList.remove(classList.item(0));
  }
  clubFormStatus.classList.add('alert', 'show');
  switch (alertColor) {
    case 'primary':
      clubFormStatus.classList.add('alert-primary');
      break;
    case 'warning':
      clubFormStatus.classList.add('alert-warning');
      break;
    case 'success':
      clubFormStatus.classList.add('alert-success');
      break;
    default:
      clubFormStatus.classList.add('alert-secondary');
  }
}
function checkEnrollment(suPageUIdata) {
  // run the alert mesage
  if (suPageUIdata.isInClub) {
    let message = `You are in currently in the the ${suPageUIdata.clubMembershipName} club`;
    clubEnrollmentMessage(message);
    clubEnrollmentColor('primary');
  } else if (suPageUIdata.isTeacher) {
    let message = `Hello Teacher ${suPageUIdata.userName}, please see the club enrollment lists below.`;
    clubEnrollmentMessage(message);
    clubEnrollmentColor('success');
  } else {
    let message = `Please choose a club from the list.`;
    clubEnrollmentMessage(message);
    clubEnrollmentColor('warning');
  }
}

function clubEnrollmentMessage(message) {
  let clubFormStatus = document.getElementById('clubAlertNotice');
  clubFormStatus.innerHTML = message;
}

function submitClubApplication() {
  disableSignupBtn();
  let clubName = document.getElementById("clubChoice").value;
  console.log(clubName);
  google.script.run.withSuccessHandler(updateSignUpUI).setRecordClubEntry(clubName);
}

function updateSignUpUI(clubApp) {
  console.log(clubApp);
  if (clubApp.recordUpdated) {
    let message = `Welcome to the ${clubApp.clubName} .`;
    clubEnrollmentMessage(message);
    clubEnrollmentColor('success');
    updateClubTableBody(clubApp.clubName);
  } else {
    let message = `Sorry, the ${clubApp.clubName} club is full, please choose another.`;
    clubEnrollmentMessage(message);
    clubEnrollmentColor('danger');
  }
}

function clearClubTableHead() {
  let clubTableHead = document.getElementById('club-table-head');
  clubTableHead.deleteRow(0);
}

function clearClubTableBody() {
  showLoader();
  let clubTableBody = document.getElementById('club-table-body');
  while (clubTableBody.rows.length > 0) {
    clubTableBody.deleteRow(0);
  }
}
function showClubTable(clubResults) {
  let clubHeader = clubResults.slice(0, 1);
  showClubTableHeader(clubHeader);
  showClubTableBody(clubResults);
}

function updateClubTableBody(clubName) {
  let clubTableBody = document.getElementById('club-table-body');
  for (let r = 0; r < clubTableBody.length; r++) {
    for (let c = 1; c < clubTableBody[r].length; c++) {
      let cell = clubTableBody[r][c].innerHTML;
      if (cell.equals(clubName)) {
        let cellValue = clubTableBody[r][1].innerHTML;
        clubTableBody[r][1].innerHTML = cellValue + 1;
        console.log(`Cell updated to ${cellValue + 1}`);
      }
    }
  }
}
function showClubTableHeader(tableHeadData) {
  let clubTableHead = document.getElementById('club-table-head');
  for (let r = 0; r < tableHeadData.length; r++) {
    let row = clubTableHead.insertRow();
    for (let c = 1; c < tableHeadData[r].length; c++) {
      let cell = row.insertCell();
      let text = document.createTextNode(tableHeadData[r][c]);
      cell.appendChild(text);
    }
  }
  removeLoader();
}

function showClubTableBody(clubResults) {
  let clubBody = clubResults.slice(1, clubResults.length);
  let clubTableBody = document.getElementById('club-table-body');
  for (let r = 0; r < clubBody.length; r++) {
    let row = clubTableBody.insertRow();
    for (let c = 1; c < clubBody[r].length; c++) {
      let cell = row.insertCell();
      let text = document.createTextNode(clubBody[r][c]);
      if (c == 2 || c == 3 || c == 6) {
        cell.classList.add("text-center");
      } else {
        cell.classList.add("pl-1");
      }
      if (clubBody[r][2] >= clubBody[r][3]) {
        cell.classList.add("table-danger", "border-primary");
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