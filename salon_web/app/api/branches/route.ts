import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
    try {
        const branches = await prisma.branch.findMany();
        return new NextResponse(JSON.stringify({ branches }), { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/branches:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
