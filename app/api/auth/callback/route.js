import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
    }

    const client_id = process.env.AUTH_CLIENT_ID;
    const client_secret = process.env.AUTH_CLIENT_SECRET;
    const redirect_uri = new URL('/api/auth/callback', request.url).href;

    if (!client_id || !client_secret) {
        return NextResponse.json({ error: 'OAuth credentials not set up' }, { status: 500 });
    }

    try {
        const tokenRes = await fetch('https://auth.hackclub.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                redirect_uri,
                code,
                grant_type: 'authorization_code'
            })
        });

        if (!tokenRes.ok) {
            const errorText = await tokenRes.text();
            return NextResponse.json({ error: 'Failed to exchange token', details: errorText }, { status: tokenRes.status });
        }

        const tokenData = await tokenRes.json();
        const { access_token, refresh_token } = tokenData;

        const meRes = await fetch('https://auth.hackclub.com/api/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!meRes.ok) {
            const errorText = await meRes.text();
            return NextResponse.json({ error: 'Failed to fetch user profile', details: errorText }, { status: meRes.status });
        }

        const meData = await meRes.json();

        // Find a unique user ID or fallback to username
        const userId = meData.id || meData.slack_id || meData.username;

        if (userId) {
            import('@/lib/redis').then(async ({ redis }) => {
                await redis.hset('users', userId, JSON.stringify(meData));

                // Initialize user_data if not exists
                const existingData = await redis.hget('user_data', userId);
                if (!existingData) {
                    await redis.hset('user_data', userId, JSON.stringify({
                        theme: 'dark', // default user pref
                        joinedAt: new Date().toISOString()
                    }));
                }
            }).catch(e => console.error('Failed to update redis:', e));
        }

        const cookieStore = await cookies();
        cookieStore.set('hc_user', JSON.stringify({ ...meData, _mapped_id: userId, access_token, refresh_token }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 15778800 // 6 months, matching auth.hackclub.com
        });

        return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
        console.error('Callback error:', error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}
