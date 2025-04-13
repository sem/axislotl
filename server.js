const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  host: 'mail.gmx.com',
  port: 587,
  secure: false,
  auth: {
    user: 'lunatone@gmx.com',
    pass: '$Emmie2004!'
  }
});

app.post('/send', async (req, res) => {
  try {
    const { fullName, email, instagram, message } = req.body;

    const mailOptions = {
      from: 'lunatone@gmx.com',
      to: email,
      subject: 'big thank',
      text: `Hello,
      
---------------------------
Full name: ${fullName}
Email: ${email}
Instagram: ${instagram}

Message:
${message}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});