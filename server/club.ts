function getClubDetailsRow(clubNameEntry: string) {
    const studentSchool = getSchool(studentValues);
    // gets the list of clubs for the current students school.
    let clubSchoolData = getSchoolClubData(studentSchool);
    return clubSchoolData.filter(r => r[1] === clubNameEntry);
}
function getClubDetails(clubNameEntry: string) {
    let clubRow = getClubDetailsRow(clubNameEntry);
    let clubDetails: string;
    clubDetails = clubRow[0][5];
    return clubDetails;
}
function getClubModerator(clubNameEntry: string) {
    let clubRow = getClubDetailsRow(clubNameEntry);
    let clubModerator: string;
    clubModerator = clubRow[0][4];
    return clubModerator;
}
function clubHasCapacity(clubNameEntry: string) {
    let clubRow = getClubDetailsRow(clubNameEntry);
    let capacity = clubRow[0][3];
    let enrolled = clubRow[0][2];
    return (capacity > enrolled);
}