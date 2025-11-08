// controllers/tasksController.js
require('dotenv').config();
const tasksModel = require('../models/tasksModel');
const sgMail = require('@sendgrid/mail');
const mailjet = require('node-mailjet');

// Configuración dinámica según proveedor
const emailProvider = process.env.EMAIL_PROVIDER || 'sendgrid';

if (emailProvider === 'sendgrid') {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('📨 Usando Twilio SendGrid para envío de correos');
} else {
  mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
  console.log('📨 Usando Mailjet para envío de correos');
}

// =================== FUNCIÓN PARA ENVIAR CORREOS ===================
async function sendEmailNotification(task) {
  try {
    if (emailProvider === 'sendgrid') {
      const msg = {
        to: process.env.TO_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: `✅ Tarea completada: ${task.name}`,
        text: `La tarea "${task.name}" ha sido marcada como completada.`,
      };
      await sgMail.send(msg);
      console.log(`Correo enviado con SendGrid a ${process.env.TO_EMAIL}`);
    } else {
      const client = mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
      await client.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: { Email: process.env.FROM_EMAIL, Name: "Servidor GraphQL" },
            To: [{ Email: process.env.TO_EMAIL, Name: "Usuario" }],
            Subject: `✅ Tarea completada: ${task.name}`,
            TextPart: `La tarea "${task.name}" ha sido completada correctamente. Tenemos terminado el trabajo! si te llego el correo es que todo salio bien.`,
          },
        ],
      });
      console.log(`Correo enviado con Mailjet a ${process.env.TO_EMAIL}`);
    }
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error.message);
  }
}

// =================== RESOLVERS ===================
const resolvers = {
  Query: {
    getAllTasks: () => tasksModel.getAllTasks(),
    getTaskById: (_, { id }) => tasksModel.getTaskById(parseInt(id)),
  },

  Mutation: {
    createTask: (_, { name }) => tasksModel.createTask(name),
    updateTask: (_, { id, name }) => tasksModel.updateTask(parseInt(id), name),
    deleteTask: (_, { id }) => tasksModel.deleteTask(parseInt(id)),
    completeTask: async (_, { id }) => {
      const task = tasksModel.completeTask(parseInt(id));
      if (task) await sendEmailNotification(task);
      return task;
    },
  },
};

module.exports = resolvers;
