let clubApp: {
    clubStatus: boolean;
    currentClub: string;
    appliedClub: string;
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
        clubStatus: isInClub(),
        currentClub: getUserClub(),
        appliedClub: clubNameEntry,
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
function logClubApp(clubApp: { clubStatus?: boolean; currentClub?: string; appliedClub: any; stuName: any; studentSchool: any; stuEmail: any; clubHasRoom: any; clubDetails: any; clubModerator: any; recordUpdated: any; }) {
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