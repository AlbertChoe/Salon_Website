import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Logging the token and pathname for debugging purposes
    console.log("Token:", token);
    console.log("Request Path:", req.nextUrl.pathname);

    const { pathname } = req.nextUrl;
    if (pathname.startsWith('/api/review') || pathname.startsWith('/api/reservation')) {
        if (!token || token.role !== 'Customer') {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }
  
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/review/:path*', '/api/reservation/:path*'],
};
