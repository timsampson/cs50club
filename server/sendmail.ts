function sendEmailNotice(clubApplication: { appliedClub: string; stuName: string; stuEmail: string; clubDetails: string; clubModerator: string; }) {
    // Create the individual template
    const htmlBody = HtmlService.createTemplateFromFile("welcome-mail");
    htmlBody.stuName = clubApplication.stuName;
    htmlBody.clubName = clubApplication.appliedClub;
    htmlBody.clubDetails = clubApplication.clubDetails;
    htmlBody.clubModerator = clubApplication.clubModerator;
    const emailHtml = htmlBody.evaluate().getContent();
    const email = clubApplication.stuEmail;
    const ccEmail = 'tsampson@dishs.tp.edu.tw';
    let welcomeMessage = 'Welcome to the ' + clubApplication.appliedClub + ' club!';
    MailApp.sendEmail({
        cc: ccEmail,
        htmlBody: emailHtml,
        subject: welcomeMessage,
        to: email,
    });
}