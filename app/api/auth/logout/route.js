import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const cookieStore = await cookies();
    cookieStore.delete('hc_user');

    return NextResponse.redirect(new URL('/', request.url));
}

export async function GET(request) {
    const cookieStore = await cookies();
    cookieStore.delete('hc_user');

    return NextResponse.redirect(new URL('/', request.url));
}
