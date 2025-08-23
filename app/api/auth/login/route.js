import { userService } from '@/src/service/userService';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Attempt login
        const { user, token } = await userService.login(email, password);

        // Set HTTP-only cookie with the token
        const response = NextResponse.json(
            { message: 'Login successful', user },
            { status: 200 }
        );

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 // 24 hours
        });

        return response;

    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 401 }
        );
    }
}