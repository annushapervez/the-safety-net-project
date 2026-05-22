import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { firstName, lastName, email, message } = await req.json();

  try {
    await resend.emails.send({
      from: 'Safety Net Project <onboarding@resend.dev>',
      to: 'safetynetprojects@gmail.com',
      replyTo: email,
      subject: `Contact Form: ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
