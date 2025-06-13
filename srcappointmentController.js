const fs = require('fs/promises');
const path = require('path');
const DB_PATH = path.join(__dirname, '../data/appointments.json');

async function saveAppointment(data) {
  const all = await getAppointments();
  const appointment = {
    id: Date.now().toString(),
    nom: data.nom,
    email: data.email,
    date: data.date,
    commentaire: data.commentaire,
    status: 'pending',
    admin_comment: '',
  };
  all.push(appointment);
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(all, null, 2));
  return appointment;
}

async function getAppointments() {
  try {
    const content = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function updateAppointment(id, decision, admin_comment) {
  const all = await getAppointments();
  const idx = all.findIndex(a => a.id === id);
  if (idx === -1) throw new Error('RDV non trouvé');
  all[idx].status = decision === 'accept' ? 'accepted' : 'refused';
  all[idx].admin_comment = admin_comment || '';
  await fs.writeFile(DB_PATH, JSON.stringify(all, null, 2));
  return all[idx];
}

module.exports = { saveAppointment, getAppointments, updateAppointment };
