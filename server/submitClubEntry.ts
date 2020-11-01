function setRecordClubEntry(clubNameEntry: string) {
    let clubApp = {
        clubName: clubNameEntry,
        updateDate: new Date(),
        stuName: getUserName(),
        studentSchool: getSchool(studentValues),
        stuEmail: getEmail(),
        clubHasRoom: clubHasCapacity(clubNameEntry),
        clubDetails: getClubDetailsRow(clubNameEntry),
        clubModerator: getClubModerator(clubNameEntry),
        recordUpdated: false,
    }
    if (clubApp.clubHasRoom) {
        clubEnrollmentSheet.appendRow([
            clubApp.updateDate,
            clubApp.stuEmail,
            clubApp.stuName,
            clubApp.studentSchool,
            clubApp.clubModerator,
            clubApp.clubName
        ]);
        sendEmailNotice(clubApp);
        clubApp.recordUpdated = true;
        return clubApp;
    }
    else {
        clubApp.recordUpdated = false;
        return clubApp;
    }
}