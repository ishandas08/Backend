import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Please provide username, email and password" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id
        });

        return NextResponse.json(
            {
                message: "User created successfully. Please verify your email.",
                success: true
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Signup error:", error);

        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            },
            { status: 500 }
        );
    }
}