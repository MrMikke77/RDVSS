const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function addEventToGoogleCalendar(appointment) {
  const event = {
    summary: `RDV avec ${appointment.nom}`,
    description: appointment.commentaire,
    start: { dateTime: appointment.date },
    end: { dateTime: new Date(new Date(appointment.date).getTime() + 30 * 60000).toISOString() }, // 30min
  };

  await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
  });
}

module.exports = { addEventToGoogleCalendar };
