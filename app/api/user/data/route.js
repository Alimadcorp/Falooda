import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';

// Helper to get authed user ID
async function getAuthedUserId() {
    const cookieStore = await cookies();
    const hcUserCookie = cookieStore.get('hc_user');
    if (!hcUserCookie?.value) return null;

    try {
        const user = JSON.parse(hcUserCookie.value);
        return user._mapped_id || user.id || user.slack_id || user.username;
    } catch (e) {
        return null;
    }
}

// GET custom user data
export async function GET() {
    try {
        const userId = await getAuthedUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await redis.hget('user_data', userId);
        return NextResponse.json(data || {});
    } catch (error) {
        console.error('Failed to get user_data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST to update custom user data
export async function POST(request) {
    try {
        const userId = await getAuthedUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const upData = await request.json();

        // Fetch existing data to merge, so we don't overwrite everything unconditionally
        // Alternatively, you can just overwrite keys as needed. For now, doing a shallow merge.
        const existing = await redis.hget('user_data', userId) || {};
        const merged = { ...existing, ...upData };

        await redis.hset('user_data', userId, JSON.stringify(merged));

        return NextResponse.json(merged);
    } catch (error) {
        console.error('Failed to update user_data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
