const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendNotificationEmail(appointment) {
  let subject, text;

  if (appointment.status === 'accepted') {
    subject = 'Votre RDV est accepté';
    text = `Bonjour ${appointment.nom},\n\nVotre rendez-vous est confirmé pour le ${appointment.date}.\n${appointment.admin_comment ? `Commentaire: ${appointment.admin_comment}\n` : ''}`;
  } else if (appointment.status === 'refused') {
    subject = 'Votre RDV est refusé';
    text = `Bonjour ${appointment.nom},\n\nVotre rendez-vous est refusé.\n${appointment.admin_comment ? `Commentaire: ${appointment.admin_comment}\n` : ''}`;
  } else {
    subject = 'Mise à jour de votre demande de RDV';
    text = `Bonjour ${appointment.nom},\n\nVotre demande a été mise à jour.`;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: appointment.email,
    subject,
    text,
  });
}

module.exports = { sendNotificationEmail };
