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
    let clubApp = {
        clubName: clubNameEntry,
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
        logClubApp(clubApp);
        return clubApp;
    }
    else {
        //clubApp.recordUpdated = false;
        return this.clubApp;
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
        clubApp.clubName,
        clubApp.clubHasRoom,
        clubApp.recordUpdated,
        clubApp.clubDetails,
    ]);
}