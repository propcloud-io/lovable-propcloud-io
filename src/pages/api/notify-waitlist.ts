import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface WaitlistNotificationData {
  entryId: string;
  name: string;
  email: string;
  propertyCount: number;
}

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body as WaitlistNotificationData;
    const { name, email, propertyCount, entryId } = data;
    
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending waitlist notification:', error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
