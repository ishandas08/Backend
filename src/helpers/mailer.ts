import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcryptjs.hash(token, 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpires: Date.now() + 3600000,
                },
                { new: true, runValidators: true }
            );
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                },
                { new: true, runValidators: true }
            );
        } else {
            throw new Error("Invalid email type");
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
            port: Number(process.env.SMTP_PORT || 2525),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const domain = process.env.DOMAIN || "http://localhost:3000";

        const verificationUrl =
            emailType === "VERIFY"
                ? `${domain}/verifyemail?token=${token}`
                : `${domain}/resetpassword?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM || "noreply@example.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password",
            html: `
                <div>
                    <h2>
                        ${emailType === "VERIFY"
                            ? "Verify Your Email"
                            : "Reset Your Password"}
                    </h2>
                    <p>
                        Click the link below to
                        ${emailType === "VERIFY"
                            ? "verify your email"
                            : "reset your password"}.
                    </p>
                    <a href="${verificationUrl}">Click here</a>
                    <p>This link expires in 1 hour.</p>
                </div>
            `,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message || "Failed to send email");
    }
};