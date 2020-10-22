
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
function getUserName() {
    let dataValues = [];
    if (isTeacher()) {
        dataValues = staffValues;
    }
    else {
        dataValues = studentValues;
    }
    let firstNameCol = getCol(dataValues, 'first_name');
    let lastNameCol = getCol(dataValues, 'last_name');
    let firstName = dataValues[getUserRow(dataValues)][firstNameCol];
    let lastName = dataValues[getUserRow(dataValues)][lastNameCol];
    let fullName = firstName + ' ' + lastName;
    return fullName;
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
function getUserClub() {
    let clubEnrollmentValues = db.getSheetByName("clubrecord").getDataRange().getValues();
    if (isInClub()) {
        let studentRecCol = (clubEnrollmentValues.findIndex(r => r[1] === getEmail()));
        let clubName = clubEnrollmentValues[studentRecCol][5];
        return `You are already enrolled in ${clubName}`;
    }
    else if (isTeacher()) {
        return 'Please see the club lists below for all levels';
    }
    else {
        return 'Please see the club administrator';
    }
}
function getClubData() {
    let clubValues = db.getSheetByName("clubs").getDataRange().getValues();
    if (isTeacher()) {
        // if the user is an admin on staff return the whole list.
        // remove the first header row using splice()
        clubValues.splice(0, 1);
        // return the remaining rows
        return clubValues;
    }
    else {
        // only return the clubs for the users school level
        return getSchoolClubData(getSchool(studentValues));
    }
}

function getSchoolClubData(school: string) {
    clubValues = db.getSheetByName("clubs").getDataRange().getValues();
    return clubValues.filter(r => r[6] === school);
}
function getClubListBySchool() {
    let clubSchoolData = getSchoolClubData(getSchool(studentValues));
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