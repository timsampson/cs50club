function setRecordClubEntry(clubNameEntry: string) {
    if (clubHasRoom(clubNameEntry)) {
        const currentDate = new Date();
        const clubApplication = {
            clubName: clubNameEntry,
            stuName: getUserName(studentValues),
            studentSchool: getSchool(studentValues),
            stuEmail: getEmail(),
            clubDetails: getClubDetails(getClubDetailsRow(clubNameEntry)),
            clubModerator: getClubModerator(getClubDetailsRow(clubNameEntry)),
        };
        clubEnrollmentSheet.appendRow([
            currentDate,
            clubApplication.stuEmail,
            clubApplication.stuName,
            clubApplication.studentSchool,
            clubApplication.clubModerator,
            clubApplication.clubName
        ]);
        sendEmailNotice(clubApplication);
        return true;
    }
    else {
        return false;
    }
}