function setRecordClubEntry(clubNameEntry: string) {
    const studentSchool = getSchool(studentValues);
    // gets the list of clubs for the current students school.
    let clubSchoolData = getSchoolClubData(studentSchool);
    let clubDetailsRow = clubSchoolData.filter(r => r[1] === clubNameEntry);
    //return clubDetails;
    // need to check the club has room available for the student's level 
    let capacity = clubDetailsRow[0][3];
    let enrolled = clubDetailsRow[0][2];
    if (capacity > enrolled) {
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
        return clubNameEntry;
    }
    else {
        return false;
    }
}