import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Send confirmation email
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to SkyScout South! 🎉',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to SkyScout South!</h1>
          <p>Thanks for signing up for flight deal alerts from your local airports.</p>
          <p>You'll start receiving weekly emails with the best deals from:</p>
          <ul>
            <li>ATL - Atlanta</li>
            <li>BNA - Nashville</li>
            <li>CHA - Chattanooga</li>
            <li>HSV - Huntsville</li>
            <li>BHM - Birmingham</li>
            <li>TYS - Knoxville</li>
          </ul>
          <p>Get ready to save hundreds on your next trip!</p>
          <p style="color: #6b7280; font-size: 14px;">SkyScout South Team</p>
        </div>
      `,
    });

    // TODO: Store email in database (we'll add this in Week 2)
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
