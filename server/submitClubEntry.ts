function setRecordClubEntry(clubNameEntry: string) {
    let clubApp = {
        appliedClub: clubNameEntry,
        clubStatus: isInClub(),
        currentClub: getUserClub(),
        stuName: getUserName(),
        studentSchool: getSchool(studentValues),
        stuEmail: getEmail(),
        clubHasRoom: clubHasCapacity(clubNameEntry),
        clubDetails: getClubDetails(clubNameEntry),
        clubModerator: getClubModerator(clubNameEntry),
        recordUpdated: false,
    }
    if (clubApp.clubHasRoom && !(isInClub())) {
        sendEmailNotice(clubApp);
        clubApp.recordUpdated = true;
        logClubApp(clubApp);
        return clubApp;
    }
    else {
        clubApp.recordUpdated = false;
        return clubApp;
    }
}
function logClubApp(clubApp) {
    let updateTime = new Date();
    clubEnrollmentSheet.appendRow([
        updateTime,
        clubApp.stuEmail,
        clubApp.stuName,
        clubApp.studentSchool,
        clubApp.clubModerator,
        clubApp.appliedClub,
        clubApp.clubHasRoom,
        clubApp.recordUpdated,
        clubApp.clubDetails,
    ]);
}