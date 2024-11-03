import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMIAL_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">Here</a> to confirm your email</p>`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetUrl = `http://localhost/new-password?token=$${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetUrl}">Here</a> to reset your password</p>`,
  });
};
