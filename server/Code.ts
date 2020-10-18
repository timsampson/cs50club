const db = SpreadsheetApp.openById("1Uf02C1mBDxwkyKPfLvmVPa1IAWIAdiw5uVDYIQvG_cg");
const clubEnrollmentSheet = db.getSheetByName("clubrecord");
const staffSheet = db.getSheetByName("staff");
const studentSheet = db.getSheetByName("students");
const clubSheet = db.getSheetByName("clubs");
let staffValues = staffSheet.getDataRange().getValues();
let clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getValues();
let studentValues = studentSheet.getDataRange().getValues();
let clubValues = clubSheet.getDataRange().getValues();

function doGet(event) {
    return HtmlService.createTemplateFromFile("index").evaluate();
}
function include(filename: string) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function isTeacher() {
    return ((staffValues.findIndex(r => r[1] === getEmail()) > 0));
}
function getScriptURL() {
    return ScriptApp.getService().getUrl();
}
function getEmail() {
    return Session.getActiveUser().getEmail();
}
function getUserRow() {
    if (isTeacher()) {
        return (staffValues.findIndex(r => r[1] === getEmail()));
    }
    else {
        return (studentValues.findIndex(r => r[4] === getEmail()));
    }
}
function getStudentEmailCol() {
    return (studentValues[0].findIndex(c => c === 'email'));
}
function getStudentSchCol() {
    return (studentValues[0].findIndex(c => c === 'school'));
}
function getStudentFNCol() {
    return (studentValues[0].findIndex(c => c === 'first_name'));
}
function getStudentMNCol() {
    return (studentValues[0].findIndex(c => c === 'middle_name'));
}
function getStudentLNCol() {
    return (studentValues[0].findIndex(c => c === 'last_name'));
}
function getStudentSchool() {
    if (getUserRow() > 0) {
        return studentValues[getUserRow()][getStudentSchCol()];
    }
    else {
        return 'No School Assigned';
    }
}
function getUserName() {
    if (isTeacher()) {
        let firstName = staffValues[getUserRow()][2];
        let lastName = staffValues[getUserRow()][3];
        let fullName = firstName + ' ' + lastName;
        return fullName;
    }
    else if (getUserRow() > 0) {
        let firstName = studentValues[getUserRow()][getStudentFNCol()];
        let lastName = studentValues[getUserRow()][getStudentLNCol()];
        let fullName = firstName + ' ' + lastName;
        return fullName;
    }
    else {
        return 'User Not Found';
    }
}
function getUserClub() {
    let clubEnrollmentValues = getUpdatedClubEnrollmentData();
    if (isInClub()) {
        let studentRecCol = (clubEnrollmentValues.findIndex(r => r[1] === getEmail()));
        let clubName = clubEnrollmentValues[studentRecCol][5];
        return clubName;
    }
}
function isInClub() {
    let clubEnrollmentValues = getUpdatedClubEnrollmentData();
    if ((clubEnrollmentValues.findIndex(r => r[1] === getEmail()) > 0)) {
        return true;
    }
    else {
        return false;
    }
}
function getClubData() {
    SpreadsheetApp.flush();
    let clubValues = getUpdatedClubData();
    if (isTeacher()) {
        // if the user is an admin on staff
        return clubValues;
    }
    else {
        // only return the clubs for the users school level
        return getSchoolClubData(getStudentSchool());
    }
}
function getUpdatedClubData() {
    SpreadsheetApp.flush();
    let getUpdatedclubValues = db.getSheetByName("clubs").getDataRange().getValues();
    clubValues = getUpdatedclubValues;
    return clubValues;
}
function setRecordClubEntry(clubNameEntry: string) {
    const studentSchool = getStudentSchool();
    // gets the list of clubs for the current students school.
    let clubSchoolData = getSchoolClubData(studentSchool);
    let clubDetailsRow = clubSchoolData.filter(r => r[1] === clubNameEntry);
    //return clubDetails;
    // need to check the club has room available for the student's level 
    let clubHasRoom = clubDetailsRow[0][3] > clubDetailsRow[0][2];
    if (clubHasRoom) {
        const currentDate = new Date();
        const clubApplication = {
            clubName: clubNameEntry,
            stuName: getUserName(),
            stuEmail: getEmail(),
            clubDetails: clubDetailsRow[0][5],
            clubModerator: clubDetailsRow[0][4]
        };
        clubEnrollmentSheet.appendRow([
            currentDate,
            clubApplication.stuEmail,
            clubApplication.stuName,
            studentSchool,
            clubApplication.clubModerator,
            clubApplication.clubName
        ]);
        sendEmailNotice(clubApplication);
        SpreadsheetApp.flush();
        return clubNameEntry;
    }
    else {
        return false;
    }
}

function getUpdatedClubEnrollmentData() {
    SpreadsheetApp.flush();
    let UpdatedClubEnrollmentValues = db.getSheetByName("clubrecord").getDataRange().getValues();
    clubEnrollmentValues = UpdatedClubEnrollmentValues;
    return clubEnrollmentValues;
}
function getSchoolClubData(school: string) {
    clubValues = getUpdatedClubData();
    return clubValues.filter(r => r[6] === school);
}
function getClubListBySchool() {
    let clubSchoolData = getSchoolClubData(getStudentSchool());
    if (clubSchoolData.length > 0) {
        let clubSchoolList = [];
        for (let r = 0; r < clubSchoolData.length; r++) {
            clubSchoolList.push(clubSchoolData[r][1]);
        }
        return clubSchoolList;
    }
    else {
        return ['No Clubs Available'];
    }
}

function sendEmailNotice(clubApplication: { clubName: string; stuName: string; stuEmail: string; clubDetails: string; clubModerator: string; }) {
    // Create the individual template
    const htmlBody = HtmlService.createTemplateFromFile("welcome-mail");
    htmlBody.stuName = clubApplication.stuName;
    htmlBody.clubName = clubApplication.clubName;
    htmlBody.clubDetails = clubApplication.clubDetails;
    htmlBody.clubModerator = clubApplication.clubModerator;
    const emailHtml = htmlBody.evaluate().getContent();
    const email = clubApplication.stuEmail;
    const ccEmail = 'tsampson@dishs.tp.edu.tw';
    let welcomeMessage = 'Welcome to the ' + clubApplication.clubName + ' club!';
    MailApp.sendEmail({
        cc: ccEmail,
        htmlBody: emailHtml,
        subject: welcomeMessage,
        to: email,
    });
}
