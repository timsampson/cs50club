function setRecordClubEntry(clubNameEntry: string) {
    if (clubHasCapacity(clubNameEntry)) {
        const currentDate = new Date();
        const clubApplication = {
            clubName: clubNameEntry,
            stuName: getUserName(),
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