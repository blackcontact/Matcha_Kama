var nodemailer = require('nodemailer');

const sendMail = function(dest, title, message) {
  const transporter = nodemailer.createTransport({
    host: 'mail-student.le-101.fr',
    port: 25,
    secure: false
  });
  const mailOptions = {
    from: '"Matcha official 👻" <matcha@le-101.fr>',
    to: dest,
    subject: 'Matcha - ' + title,
    text: 'You received a new message!\n\n' + message + '\n\n\nThank you for using Matcha!',
  };
  console.log(`Mail sent to ${dest}`);
  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;