import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
    try {
        const { name, location, phone, openingTime, closingTime } = await request.json();
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'Admin') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        if (!name || !location || !phone || !openingTime || !closingTime) {
            return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const newBranch = await prisma.branch.create({
            data: {
                name,
                location,
                phone,
                openingTime,
                closingTime,
            },
        });

        return new NextResponse(JSON.stringify(newBranch), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/addBranch:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
