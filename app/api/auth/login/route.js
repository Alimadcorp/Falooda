import { NextResponse } from 'next/server';

export async function GET(request) {
    const client_id = process.env.AUTH_CLIENT_ID;
    const redirect_uri = new URL('/api/auth/callback', request.url).href;
    const scope = 'openid+profile+email+name+slack_id+verification_status';

    if (!client_id) {
        return new NextResponse('AUTH_CLIENT_ID not configured', { status: 500 });
    }

    const redirectUrl = `https://auth.hackclub.com/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scope}`;

    return NextResponse.redirect(redirectUrl);
}
