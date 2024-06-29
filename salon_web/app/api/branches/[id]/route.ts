import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
    const host = req.headers.get('host'); // Correctly accessing the host header
    if (!host) {
        console.error('Host header is missing');
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
    const url = new URL(req.nextUrl.pathname, `http://${host}`);
    const id = url.pathname.split('/').pop();  // Assuming 'id' is the last segment of the pathname

    if (typeof id !== 'string') {
        console.error('Invalid ID:', id);
        return new NextResponse(JSON.stringify({ error: 'Invalid branch ID' }), { status: 400 });
    }

    try {
        const branch = await prisma.branch.findUnique({
            where: { id },
            include: { services: true }
        });

        if (!branch) {
            return new NextResponse(JSON.stringify({ error: 'Branch not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(branch), { status: 200 });
    } catch (error) {
        console.error(`Error in GET /api/branches/${id}:`, error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
