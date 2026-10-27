import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];
const POSITIONS = ['Social Media Volunteer', 'Grant Applications Volunteer'];

export async function POST(req: Request) {
  const form = await req.formData();
  const field = (name: string) => String(form.get(name) ?? '').trim();
  const firstName = field('firstName');
  const lastName = field('lastName');
  const email = field('email');
  const phone = field('phone');
  const volunteerType = field('volunteerType');
  const resume = form.get('resume');

  if (!firstName || !lastName || !email || !phone || !POSITIONS.includes(volunteerType)) {
    return NextResponse.json({ error: 'Please fill out all required fields.' }, { status: 400 });
  }
  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: 'Please upload your resume.' }, { status: 400 });
  }
  const ext = resume.name.split('.').pop()?.toLowerCase() ?? '';
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json({ error: 'Resume must be a PDF or Word document.' }, { status: 400 });
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: 'Resume must be under 4 MB.' }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Safety Net Project <onboarding@resend.dev>',
      to: 'safetynetprojects@gmail.com',
      replyTo: email,
      subject: `${volunteerType} Application: ${firstName} ${lastName}`,
      text: `Position: ${volunteerType}\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nResume attached.`,
      attachments: [
        {
          filename: `${firstName}-${lastName}-resume.${ext}`.replace(/[^\w.-]+/g, '_'),
          content: Buffer.from(await resume.arrayBuffer()),
        },
      ],
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending volunteer email:', error);
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 });
  }
}
