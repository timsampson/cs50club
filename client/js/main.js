import 'bootstrap'
import '../scss/main.scss'
document.addEventListener('DOMContentLoaded', (event) => {
  // get the proper URL, dev or exec
  google.script.run.withSuccessHandler(showLinks).getScriptURL();
  // get the proper URL, dev or exec
  google.script.run.withSuccessHandler(showUserName).getUserName();
  // create dropdown with the available clubs
  google.script.run.withSuccessHandler(showClubOptions).getClubNamesBySchool();
  google.script.run.withSuccessHandler(checkEnrollment).isInClub();
  // create club table
  google.script.run.withSuccessHandler(showClubTable).getClubData();
  document
    .getElementById('clubAppBtn')
    .addEventListener('click', submitClubApplication);
});
// Nav display
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
function checkEnrollment(isEnrolled) {
  // run the alert mesage
  if (isEnrolled) {
    google.script.run.withSuccessHandler(clubEnrollmentWelcome).getUserClub();
    function clubEnrollmentWelcome(usersClub) {
      let message = `You are in currently in the the ${usersClub} club`;
      clubEnrollmentMessage(message);
      clubEnrollmentColor('primary');
    }
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
  google.script.run.withSuccessHandler(setTheClubEntry).clubHasCapacity(clubName);
}

function setTheClubEntry(clubHasCapacity) {
  console.log(clubHasCapacity.available);
  console.log(clubHasCapacity.club);
  if (clubHasCapacity.available) {
    google.script.run.setRecordClubEntry(clubHasCapacity.clubName);
    google.script.run.withSuccessHandler(finishRecordDisplay).isInClub();
    finishRecordDisplay(finished);
  } else {
    clubEnrollmentMessage('Sorry, your club choice is full, please choose another option.');
    clubEnrollmentColor('warning');
  }
  removeLoader();
  enableSignupBtn();
}
function finishRecordDisplay(finished) {
  let message = `Welcome to the ${clubName} club`;
  clubEnrollmentMessage(message);
  clubEnrollmentColor('success');
  clearClubTableBody();
  showLoader();
  if (finished) {
    google.script.run.withSuccessHandler(showClubTableBody).getClubData();
  }
  else {
    google.script.run.withSuccessHandler(finishRecordDisplay).isInClub();
  }
  removeLoader();
  enableSignupBtn();
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