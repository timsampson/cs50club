function getClubDetails(clubNameEntry: string) {
    let clubDetailsRow = getClubDetailsRow(clubNameEntry);
    return clubDetailsRow[0][5];
}

function getClubModerator(clubNameEntry: string) {
    let clubDetailsRow = getClubDetailsRow(clubNameEntry);
    return clubDetailsRow[0][4];
}

function getClubDetailsRow(clubNameEntry: string) {
    const studentSchool = getSchool(studentValues);
    // gets the list of clubs for the current students school.
    let clubSchoolData = getSchoolClubData(studentSchool);
    return clubSchoolData.filter(r => r[1] === clubNameEntry);
}

function clubHasCapacity(clubNameEntry: string) {
    let clubDetailsRow = getClubDetailsRow(clubNameEntry);
    let capacity = clubDetailsRow[0][3];
    let enrolled = clubDetailsRow[0][2];
    return (capacity > enrolled);
}

