import express from 'express';
import * as nodemailer from 'nodemailer';

const router = express.Router();

// Create reusable transporter object using OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

router.post('/notify', async (req, res) => {
  try {
    const { name, email, propertyCount, entryId } = req.body;
    
    // Create email content
    const emailContent = `
      New Waitlist Signup!
      
      Name: ${name}
      Email: ${email}
      Property Count: ${propertyCount}
      Entry ID: ${entryId}
      Time: ${new Date().toISOString()}
    `;

    // Send email
    await transporter.sendMail({
      from: 'PropCloud Waitlist <noreply@propcloud.io>',
      to: 'contact@propcloud.io',
      subject: `New Waitlist Signup - ${name}`,
      text: emailContent,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending waitlist notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

export default router;
