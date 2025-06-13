const express = require('express');
const bodyParser = require('body-parser');
const { saveAppointment, getAppointments, updateAppointment } = require('./src/appointmentController');
const { sendNotificationEmail } = require('./src/emailService');
const { addEventToGoogleCalendar } = require('./src/googleCalendarService');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Prise de RDV par le client
app.post('/api/appointment', async (req, res) => {
  try {
    const appointment = await saveAppointment(req.body);
    res.json({ success: true, appointment });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Liste tous les rendez-vous (admin)
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.json({ appointments });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Validation/refus de RDV (admin)
app.post('/api/appointment/:id/decision', async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, comment } = req.body; // decision: "accept" ou "refuse"
    const updated = await updateAppointment(id, decision, comment);

    await sendNotificationEmail(updated);

    if (decision === 'accept') {
      await addEventToGoogleCalendar(updated);
    }
    res.json({ success: true, appointment: updated });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
