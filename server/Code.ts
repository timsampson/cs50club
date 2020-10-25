
function isTeacher() {
    return ((staffValues.findIndex(r => r[1] === getEmail()) > 0));
}
function getScriptURL() {
    return ScriptApp.getService().getUrl();
}
function getEmail() {
    return Session.getActiveUser().getEmail();
}
function getUserRow(values: any[]) {
    return (values.findIndex(r => r[1] === getEmail()));
}
function getCol(values: any[], colName: string) {
    return (values[0].findIndex((c: string) => c === colName));
}
function getSchool(values: any[]) {
    if (getUserRow(values) > 0) {
        return values[getUserRow(values)][getCol(studentValues, 'school')];
    }
    else {
        return 'No School Assigned';
    }
}
function getUserName(dataValues: any[]) {
    let firstNameCol = getCol(dataValues, 'first_name');
    let lastNameCol = getCol(dataValues, 'last_name');
    let firstName = dataValues[getUserRow(dataValues)][firstNameCol];
    let lastName = dataValues[getUserRow(dataValues)][lastNameCol];
    let fullName = firstName + ' ' + lastName;
    return fullName;
}
function getUserClub() {
    let clubEnrollmentValues = db.getSheetByName("clubrecord").getDataRange().getValues();
    if (isTeacher()) {
        return 'Please see the available clubs from the list below';
    }
    else if (isInClub()) {
        let studentRecCol = (clubEnrollmentValues.findIndex(r => r[1] === getEmail()));
        let clubName = clubEnrollmentValues[studentRecCol][5];
        return clubName;
    } else {
        return 'Not enrolled';
    }
}
function isInClub() {
    let clubEnrollmentValues = db.getSheetByName("clubrecord").getDataRange().getValues();
    if ((clubEnrollmentValues.findIndex(r => r[1] === getEmail()) > 0)) {
        return true;
    }
    else {
        return false;
    }
}
function getClubData() {
    let clubValues = db.getSheetByName("clubs").getDataRange().getValues();
    if (isTeacher()) {

        return clubValues;
    }
    else {
        // only return the clubs for the users school level
        return getSchoolClubData(getSchool(studentValues));
    }
}
function getSchoolClubData(school: string) {
    clubValues = db.getSheetByName("clubs").getDataRange().getValues();
    let clubHeader = clubValues.splice(0, 1);
    let studentClubValues = clubValues.filter(r => r[6] === school);
    studentClubValues.unshift(clubHeader[0]);
    return studentClubValues;
}
function getClubNamesBySchool() {
    let clubSchoolData = getSchoolClubData(getSchool(studentValues));
    clubSchoolData.shift();
    if (clubSchoolData.length > 0) {
        let clubSchoolList = [];
        for (let r = 0; r < clubSchoolData.length; r++) {
            clubSchoolList.push(clubSchoolData[r][1]);
        }
        return clubSchoolList;
    }
}