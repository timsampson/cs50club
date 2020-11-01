let clubApp: {
    clubName: string;
    updateDate: Date;
    stuName: string;
    studentSchool: string;
    stuEmail: string;
    clubHasRoom: boolean;
    clubDetails: string;
    clubModerator: string;
    recordUpdated: boolean;
}

function setRecordClubEntry(clubNameEntry: string) {
    clubApp = {
        clubName: clubNameEntry,
        updateDate: new Date(),
        stuName: getUserName(),
        studentSchool: getSchool(studentValues),
        stuEmail: getEmail(),
        clubHasRoom: clubHasCapacity(clubNameEntry),
        clubDetails: getClubDetails(clubNameEntry),
        clubModerator: getClubModerator(clubNameEntry),
        recordUpdated: false,
    }
    if (clubApp.clubHasRoom) {
        sendEmailNotice(clubApp);
        clubApp.recordUpdated = true;
        logClubApp();
        return clubApp;
    }
    else {
        //clubApp.recordUpdated = false;
        return clubApp;
    }
}
function logClubApp() {
    clubEnrollmentSheet.appendRow([
        clubApp.updateDate,
        clubApp.stuEmail,
        clubApp.stuName,
        clubApp.studentSchool,
        clubApp.clubModerator,
        clubApp.clubName,
        clubApp.clubHasRoom,
        clubApp.recordUpdated,
        clubApp.clubDetails,
    ]);
}